// user-service.ts
import { User } from "../entity/user";
import { AppDataSource } from "../dataSource";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET } from "../middleware/auth";

class UserService {
    private userRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    addUser = async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
        user.role = 'user';
        return this.userRepository.save(user);
    }

    checkRegister = async (user) => {
        return this.userRepository.findOne({ username: user.username });
    }

    checkUser = async (user) => {
        const userFind = await this.userRepository.findOne({ username: user.username });
        if (!userFind) {
            throw new Error('User is not exist');
        }
        const isPasswordCorrect = await bcrypt.compare(user.password, userFind.password);
        if (!isPasswordCorrect) {
            throw new Error('Password is wrong');
        }
        const payload = {
            idUser: userFind.idUser,
            username: userFind.username,
            role: userFind.role,
        };
        const token = jwt.sign(payload, SECRET, { expiresIn: '10d' });
        payload['token'] = token;
        return payload;
    }

    changePassword = async (userId: number, currentPassword: string, newPassword: string) => {
        const data = await this.userRepository.find({idUser: userId});
        const user = data[0]
        if (!user) {
            throw new Error("User not found");
        }
        const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordCorrect) {
            throw new Error("Incorrect current password");
        }
        if (currentPassword === newPassword) {
            throw new Error("New password must be different from the current password");
        }
        // Add additional password validation logic if necessary
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await this.userRepository.save(user);
    };
    getAllUsers = async () => {
        return this.userRepository.find();
    }

    getUserById = async (userId: number) => {
        return this.userRepository.findOne(userId);
    }
}

export default new UserService();
