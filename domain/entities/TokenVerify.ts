export class TokenVerify{

    public email: string;
    public status: boolean;
    public tf_token: string;
    public id?: string;

    private constructor(email: string, status: boolean, tf_token: string, id?: string | undefined){
        this.email = email
        this.status = status
        this.tf_token = tf_token
        this.id = id
    }

    public static create(email:string, status: boolean, tf_token: string, id?: string | undefined ): TokenVerify{
        return new TokenVerify(email, status, tf_token, id)
    }
}