import { IsString, IsEmail, IsNotEmpty, MinLength, Matches } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    @MinLength(8)
    readonly password: string;
}
