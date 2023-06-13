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


    changePassword = async (req: Request, res: Response) => {
        try {
            const { currentPassword, newPassword, confirmNewPassword } = req.body;
            if (!currentPassword || !newPassword || !confirmNewPassword) {
                return res.status(400).json({ message: "Please provide current password, new password, and confirm new password" });
            }
            if (newPassword !== confirmNewPassword) {
                return res.status(400).json({ message: "New password and confirm new password do not match" });
            }
            const userId = Number(req.params.idUser); // Convert the idUser from string to number
            await userService.changePassword(userId, currentPassword, newPassword);
            return res.status(200).json({ message: "Password changed successfully" });
        } catch (error) {
            console.log(error)
            if (error.message === "User not found") {
                return res.status(404).json({ message: "User not found" });
            }
            if (error.message === "Incorrect current password") {
                return res.status(400).json({ message: "Incorrect current password" });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    };

    getAllUsers = async (req: Request, res: Response) => {
        try {
            const users = await userService.getAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    };

    getUserById = async (req: Request, res: Response) => {
        try {
            const userId = Number(req.params.idUser); // Convert the idUser from string to number
            const user = await userService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    };
}

export default new UserController();
