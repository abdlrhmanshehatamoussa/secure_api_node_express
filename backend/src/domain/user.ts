import { Note } from "./note";
import { Point } from "./point";

export class User{
    globalId:string;
    name:string;
    email:string;
    password:string;
    createdOn:Date;
    points:Point[];
    notes:Note[];
}