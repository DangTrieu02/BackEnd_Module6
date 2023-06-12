// user-controller.ts
import {Request, Response} from "express";
import userService from "../service/userService";

class UserController {
    constructor() {
    }

    register = async (req: Request, res: Response) => {
        let userCheck = await userService.checkRegister(req.body);
        if (userCheck) {
            res.status(400).json('User already existed!')
        } else if (!req.body.username || !req.body.password) {
            res.status(401).json('Please fill all the information!')
        } else {
            await userService.addUser(req.body);
            // await orderService.createNewOrder(req.body);
            res.status(201).json('Create User Success!');
        }
    }

    login = async (req: Request, res: Response) => {
        let resultCheck = await userService.checkUser(req.body);
        res.status(200).json(resultCheck);
    }

    changePassword = async (req: Request, res: Response) => {
        const {currentPassword, newPassword} = req.body;
        if (!currentPassword || !newPassword) {
            res.status(400).json({message: "Please provide current and new password"});
        } else {
            const userId = req.body.idUser; // Assuming you have middleware to authenticate and populate `req.user`

            try {
                await userService.changePassword(userId, currentPassword, newPassword);
                res.status(200).json({message: "Password changed successfully"});
            } catch (error) {
                res.status(400).json({message: "Invalid password or error occurred"});
            }
        }
    }
}

export default new UserController()