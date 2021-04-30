import { Point, User } from "../domain/module";
import { UsersRepository } from "./users-repo";

export class PointsRepository {
    //Offline purpose
    private points: Point[] = [];

    public static instance: PointsRepository = new PointsRepository();
    private PointsRepository() { };


    public async get(userId: string): Promise<Point[]> {
        let points: Point[] = this.points.filter(n => n.userId == userId);
        let user:User = await UsersRepository.instance.getById(userId);
        if(user == null){
            throw new Error("User not found");
        }
        return points;
    }

    public async save(description: string, userId: string): Promise<Point> {
        let user:User = await UsersRepository.instance.getById(userId);
        if(user == null){
            throw new Error("User not found");
        }
        let point: Point = new Point();
        point.description = description;
        point.grantedOn = new Date();
        point.userId = userId;
        this.points.push(point);
        return point;
    }
}