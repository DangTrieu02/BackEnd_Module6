import {Request, Response} from "express";
import UserService from "../service/userService";

class UserController {
    private userService;

    constructor() {
        this.userService = UserService
    }

    login = async (req: Request, res: Response) => {
        try {
            let response = await this.userService.checkUser(req.body)
            if (response === "user not found" || response === "wrong password") {
                res.status(401).json(response)
            } else {
                return res.status(200).json(response)
            }
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
}

export default new UserController()