
import { DataSource } from 'typeorm';
import {User} from "../entity/user";
import { AppDataSource } from 'src/dataSource';


class UserProfile {
    private userRepository;

    constructor (){
        const userRepository = AppDataSource.getRepository(User)
    }

    displayUser = async () => {
        
    }
}
