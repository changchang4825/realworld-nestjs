import { OmitType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

export class LoginUserClass extends OmitType(CreateUserDto, ["username"]) {}