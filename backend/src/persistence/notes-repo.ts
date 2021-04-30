import { Note, Point, User } from "../domain/module";
import { UsersRepository } from "./users-repo";

export class NotesRepository {
    //Offline purpose
    private notes: Note[] = [];

    public static instance: NotesRepository = new NotesRepository();
    private NotesRepository() { };


    public async get(userId: string): Promise<Note[]> {
        let notes: Note[] = this.notes.filter(n => n.userId == userId);
        let user:User = await UsersRepository.instance.getById(userId);
        if(user == null){
            throw new Error("User not found");
        }
        return notes;
    }

    public async save(text: string, userId: string): Promise<Note> {
        let user:User = await UsersRepository.instance.getById(userId);
        if(user == null){
            throw new Error("User not found");
        }
        let note: Note = new Note();
        note.text = text;
        note.createdOn = new Date();
        note.userId = userId;
        this.notes.push(note);
        return note;
    }
}