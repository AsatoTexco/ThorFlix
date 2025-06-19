

import {NextRequest, NextResponse} from 'next/server';
import {tokenVerifyUseCase, userUseCase} from "@/config/dependencies";
import {createUserRequest, CreateUserRequestType} from "@/infrastructure/validators/user/CreateUserRequest";
import {z} from "zod/v4"
import {User} from "@/domain/entities/User";
import {TokenVerify} from "@/domain/entities/TokenVerify";
import {handlerException} from "@/infrastructure/ExceptionHandlers/handlerException";

export async function POST(request: NextRequest): Promise<NextResponse<unknown>> {

        try{
                const body = await request.json()
                const validatedData: CreateUserRequestType = createUserRequest.parse(body)

                const userCreated: User = await userUseCase.createUser(
                    validatedData.name,
                    validatedData.password,
                    validatedData.creation_id
                )

                return NextResponse.json({message: "Usuário criado com Sucesso!", email: userCreated.email}, {status: 201});

        }catch (e) {
                if(e instanceof z.ZodError){
                        let errors = ""
                        Object.keys(z.flattenError(e).fieldErrors).map((key) => errors+=`${z.flattenError(e).fieldErrors[key]}; `)
                        return NextResponse.json({message: errors}, {status: 400})
                }
                if(e instanceof Error){
                        return NextResponse.json({"message": e.message  }, {status: 500})
                }

                return handlerException(e)

        }

}