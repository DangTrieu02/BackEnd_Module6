// user-controller.ts
import { Request, Response } from "express";
import userService from "../service/userService";

class UserController {
    register = async (req: Request, res: Response) => {
        try {
            const userCheck = await userService.checkRegister(req.body);
            if (userCheck) {
                return res.status(400).json('User already exists!');
            }
            if (!req.body.username || !req.body.password) {
                return res.status(401).json('Please fill in all the information!');
            }
            await userService.addUser(req.body);
            return res.status(201).json('Create User Success!');
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    };

    login = async (req: Request, res: Response) => {
        try {
            const resultCheck = await userService.checkUser(req.body);
            return res.status(200).json(resultCheck);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    };

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
