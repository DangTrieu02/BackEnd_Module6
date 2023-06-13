import {Request, Response} from "express";
import UserService from "../service/userService";
import bcrypt from "bcrypt";
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
    register = async (req: Request, res: Response) => {
        try {
          let user = req.body;
          let userFind = await this.userService.findOne(req.body.username);
          if (userFind) {
            res.status(209).json({ message: "User name already used" });
          } else {
            user.password = await bcrypt.hash(user.password, 10);
            let newUser = await this.userService.register(user);
            res
              .status(201)
              .json({ newUser: newUser, message: "Register successfully" });
          }
        } catch (err) {
            console.log(err);
        }
      };
}

export default new UserController()