import { User } from "../domain/module";

export class UsersRepository {
    //Offline purpose
    private users: User[] = [];

    public static instance: UsersRepository = new UsersRepository();
    private UsersRepository() { };

    public async getByEmail(email: string): Promise<User> {
        let user: User = this.users.find(x => x.email == email);
        return user;
    }

    public async getById(id: string): Promise<User> {
        let user: User = this.users.find(x => x.globalId == id);
        return user;
    }


    public async save(email: string, password: string): Promise<User> {
        let existingUser: User = await this.getByEmail(email);
        if (existingUser != null) {
            throw new Error("User already exists");
        }
        let user: User = new User();
        user.email = email;
        user.password = password;
        user.createdOn = new Date();
        user.globalId = (this.users.length + 1).toString();
        this.users.push(user);
        return user;
    }
}