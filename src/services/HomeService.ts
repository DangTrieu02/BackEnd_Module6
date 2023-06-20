import {AppDataSource} from "../dataSource";
import {Home} from "../entity/home";
import {getRepository} from "typeorm";

class HomeService{
    private homeRepository
    constructor() {
        this.homeRepository = AppDataSource.getRepository(Home)
    }
    getAll = async () => {
        let sql = `select * from home h join category c on h.categoryidCategory = c.idCategory`;
        let homes = await this.homeRepository.query(sql);
        if (!homes) {
            return "No homes found";
        }
        return homes;
    };
    findHomeByAddress = async (value) => {
        try {
        let sql = `select * from home h join category c on h.categoryidCategory = c.idCategory where h.address like "${value}"`;
        console.log(sql)
        let homes = await this.homeRepository.query(sql);
        if (!homes) {
            return null;
        }
        return { homes: homes };
    } catch (err) {
            console.log(err)
        }}
    findHomeForRent = async () => {
        let sql = `select * from home h join category c on h.categoryidCategory = c.idCategory where h.status = 'For rent'`;
        let homes = await this.homeRepository.query(sql);
        if (!homes) {
            return null;
        }
        return { homes: homes };
    }
    findHomeRented = async () => {
        let sql =` select * from home h join category c on h.categoryidCategory = c.idCategory where h.status = 'Rented'`;
        let homes = await this.homeRepository.query(sql);
        if (!homes) {
            return null;
        }
        return { homes: homes };
    };

}
export default new HomeService()