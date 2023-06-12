import {User} from "../entity/user";
import {AppDataSource} from "../dataSource";

class UserService {
    private userRepository;
    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }
    register = async (user)=>{
        await this.userRepository.save(user)
    }
    findOne = async (userName) => {
        let userFind = await this.userRepository.findOne({
            where: {
                username: userName,
            }
        });
        return userFind;
    } 
}

export default new UserService();