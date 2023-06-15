// userService.ts
import { User } from "../entity/user";
import { AppDataSource } from "../dataSource";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../middleware/auth";

class UserService {
    private userRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    checkUser = async (user) => {
        let userCheck = await this.userRepository.findOneBy({ username: user.username });

        if (!userCheck) {
            return "user not found";
        } else {
            let passwordCompare = await bcrypt.compare(user.password, userCheck.password);

            if (!passwordCompare) {
                return "wrong password";
            } else {
                let isGoogleAccount = false;

                // Check if the account is a Google account
                if (userCheck.password === "0" && userCheck.phoneNumber === 0) {
                    isGoogleAccount = true;
                }

                let payload = {
                    idUser: userCheck.idUser,
                    username: userCheck.username,
                    fullName: userCheck.fullName,
                    phoneNumber: userCheck.phoneNumber,
                    role: userCheck.role,
                    isGoogleAccount: isGoogleAccount, // Add isGoogleAccount to the payload
                };

                const token = jwt.sign(payload, SECRET, {
                    expiresIn: 3600000,
                });

                let userRes = {
                    idUser: userCheck.idUser,
                    username: userCheck.username,
                    role: userCheck.role,
                    fullName: userCheck.fullName,
                    phoneNumber: userCheck.phoneNumber,
                    token: token,
                    isGoogleAccount: isGoogleAccount, // Add isGoogleAccount to the user response
                };

                return userRes;
            }
        }
    };

    register = async (user: User) => {
        return this.userRepository.save(user);
    };

    findOne = async (username: string) => {
        return this.userRepository.findOneBy({ username });
    };

    changePassword = async (userId: number, currentPassword: string, newPassword: string) => {
        const user = await this.userRepository.findOne(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const passwordCompare = await bcrypt.compare(currentPassword, user.password);
        if (!passwordCompare) {
            throw new Error("Incorrect current password");
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await this.userRepository.save(user);
    };

    loginWithGoogle = async (user) => {
        let userCheck = await this.userRepository.findOneBy({ username: user.username });
        if (!userCheck) {
            userCheck = new User();
            userCheck.username = user.username;
            userCheck.password = "0";
            userCheck.fullName = user.fullName;
            userCheck.avatar = user.avatar;
            userCheck.phoneNumber = 0;
            await this.userRepository.save(userCheck);
        }

        let payload = {
            idUser: userCheck.idUser,
            username: userCheck.username,
            fullName: userCheck.fullName,
            phoneNumber: userCheck.phoneNumber,
            role: userCheck.role,
            isGoogleAccount: true, // Set isGoogleAccount to true
        };

        const token = jwt.sign(payload, SECRET, {
            expiresIn: 3600000,
        });

        return token;
    };
}

export default new UserService();