import { OmitType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString } from "class-validator";
import { User } from "../schemas/user.schema";

class ResponseUser extends OmitType(User, ["password"]) {
    @IsString()
    @IsNotEmpty()
    token: string
}

export interface ResponseUserDto {
    "user": ResponseUser
}