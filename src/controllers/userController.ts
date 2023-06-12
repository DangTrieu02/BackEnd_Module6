import { Request, Response } from "express";
import userService from "../services/userService";
import bcrypt from "bcrypt";

class UserController {
  constructor() {}

  register = async (req: Request, res: Response) => {
    try {
      let user = req.body;
      let userFind = await userService.findOne(req.body.username);
      if (userFind) {
        res.status(200).json({ message: "User name already used" });
      } else {
        user.password = await bcrypt.hash(user.password, 10);
        let newUser = await userService.register(user);
        res
          .status(201)
          .json({ newUser: newUser, message: "Register successfully" });
      }
    } catch (err) {
        console.log(err);
    }
  };
}

export default new UserController();
