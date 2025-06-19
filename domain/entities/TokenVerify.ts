export class TokenVerify{
    public email: string;
    public status: boolean;
    public tf_token: string;

    private constructor(email: string, status: boolean, tf_token: string){
        this.email = email
        this.status = status
        this.tf_token = tf_token
    }

    public static create(email:string, status: boolean, tf_token: string){
        return new TokenVerify(email, status, tf_token)
    }
}