import { NextFunction, Response, Request } from "express";
import { Note } from "../domain/note";
import { NotesRepository } from "../persistence/notes-repo";

export class NotesController {
    public static instance: NotesController = new NotesController();
    private constructor() { }

    public async post(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let payload: any = req.body;
            let text: string = payload.text;
            let userId: string = payload.userId;
            let note: Note = await NotesRepository.instance.save(text, userId);
            let result: any = JSON.stringify(note);
            res.send(result);
        } catch (e) {
            next(e);
        }
    }

    public async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let userId: any = req.params.id;
            let notes: Note[] = await NotesRepository.instance.get(userId);
            let result: any = JSON.stringify(notes);
            res.send(result);
        } catch (e) {
            next(e);
        }
    }
}