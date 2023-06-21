import {AppDataSource} from "../dataSource";
import {Home} from "../entity/home";
import {Request, Response} from "express";

class HomeService{
    private homeRepository
    constructor() {
        this.homeRepository = AppDataSource.getRepository(Home)
    }
    findHomeByAddress = async (value) => {
        try {
        let sql = `select * from home h join category c on h.categoryidCategory = c.idCategory where h.address like "${value}"`;
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
    findHomeById = async (idHome)=>{
        return this.homeRepository.findOneBy({idHome:idHome});
    }

    async createHome(newHome) {
        try {
            return await this.homeRepository.save(newHome);
        } catch (e) {
            console.log(e, "at createHome");
        }
    }

    async getAllHome() {
        try {
            return await this.homeRepository.find({
                relations: {
                    image: true
                },});
        } catch (e) {
            console.log(e, "at getAllHome");
        }
    }



    async getHomeByUserId(userId) {
        try {
            return await this.homeRepository.find({user: userId});
        } catch (e) {
            console.log(e,'at getHomeByUser ');
        }
    }

    async getHome(userId){
        try {
            return await this.homeRepository.find();
        } catch (e) {
            console.log(e,'at getHomeByUser ');
        }
    }

    async updateHome(id,newHome) {
        try {
            let home = await this.homeRepository.findOneBy({ idHome: id });
            home = {...home,...newHome};
            return await this.homeRepository.save(home)
        }catch (e) {
            console.log(e)
        }
    }
    search = async (req: Request, res: Response) =>{
        let sql = `from home h 
                    join category c on h.categoryIdCategory =  c.idCategory 
                    where (1=1)`
        if(req.query.keyword !== undefined){
            sql += `and (address like '%${req.query.keyword}%' or status like '%${req.query.keyword}%' or nameHome like '%${req.query.keyword}%')`
        }
        if(req.query.category !== undefined){
            sql += `and nameCategory like '%${req.query.category}%'`
        }
        let homes = await this.homeRepository.query('select * '+ sql);
        if (!homes) {
            return null;
        }
        return { homes: homes };

    }

}
export default new HomeService()