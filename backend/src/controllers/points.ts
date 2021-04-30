import { NextFunction, Response, Request } from "express";
import { PointsRepository } from "../persistence/module";
import { Point } from "../domain/module";

export class PointsController {
    public static instance: PointsController = new PointsController();
    private constructor() { }

    public async post(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let payload: any = req.body;
            let desc: any = payload.description;
            let userId: any = payload.userId;
            let point: Point = await PointsRepository.instance.save(desc, userId);
            let result:any = JSON.stringify(point);
            res.send(result);
        } catch (e) {
            next(e);
        }
    }

    public async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let userId: any = req.params.id;
            let points: Point[] = await PointsRepository.instance.get(userId);
            let result: any = JSON.stringify({
                count: points.length
            });
            res.send(result);
        } catch (e) {
            next(e);
        }
    }
}