import {AppException} from "@/domain/exceptions/AppException";
import {NextResponse} from "next/server";

export function handlerException(error: unknown){
    if(error instanceof AppException){
        return NextResponse.json({message: error.message}, {status: error.statusCode})
    }

    // Logger

    console.error("Exception Tratada: ", error)

    return NextResponse.json({message: "Internal Server Error"}, {status: 500})
}