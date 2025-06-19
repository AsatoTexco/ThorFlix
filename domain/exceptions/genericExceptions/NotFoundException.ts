import {AppException} from "@/domain/exceptions/AppException";
export class NotFoundException extends AppException{
    constructor(message: string = "Não encontrado") {
        super(message, 404);
    }
}