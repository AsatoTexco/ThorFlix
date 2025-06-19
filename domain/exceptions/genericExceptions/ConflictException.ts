import {AppException} from "@/domain/exceptions/AppException";

export class ConflictException extends AppException{
    constructor(message: string = "Conflict") {
        super(message, 409);
    }
}