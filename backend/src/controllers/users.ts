import { NextFunction, Request, Response } from "express";
import { UsersRepository } from "../persistence/module";
import { User } from "../domain/module";
export class UsersController {
    public static instance: UsersController = new UsersController();
    private constructor() { }

    public async post(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let payload: any = req.body;
            let email: string = payload.email;
            let password: string = payload.password;
            if (email === undefined || email === null || email.trim() == "") {
                throw new Error("Email cannot be empty");
            }
            if (password === undefined || password === null || password.length < 6) {
                throw new Error("Password must be (6) characters at least");
            }
            let user: User = await UsersRepository.instance.save(email, password);
            let result: any = JSON.stringify(user);
            res.send(result);
        } catch (e) {
            next(e);
        }
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let payload: any = req.body;
            let email: string = payload.email;
            let password: string = payload.password;
            let user: User = await UsersRepository.instance.getByEmail(email);
            if (user == null) {
                throw new Error("User not found");
            }
            if (user.password != password) {
                throw new Error("Invalid password");
            }
            let result: any = JSON.stringify(user);
            res.send(result);
        } catch (e) {
            next(e);
        }
    }
}