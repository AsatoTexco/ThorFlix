export class AppException extends Error{

    public readonly statusCode: number;
    constructor(message: string, statusCode:number = 500) {
        super(message);
        this.statusCode = statusCode
        this.name = this.constructor.name 
        Object.setPrototypeOf(this, new.target.prototype)
    }


}