export class User {
    public name: string;
    public email: string;
    public password: string;
    public status: string;
    public created_at: Date;

    private constructor(name: string, email: string, password: string, status: string, created_at: Date) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.status = status;
        this.created_at = created_at;
    }

    public static create(name:string, email:string, password:string, status: string, created_at: Date ): User {
        if(status != "confirmed" && status != "pending"  && status != "blocked") {
            throw new Error("Status of user need to be 'confirmed' or 'pending'");
        }
        if(name.trim().length < 3){
            throw  new Error("Name must have at least 3 characters")
        }
        return new User(name, email, password, status, created_at);
    }

}