import { PickType } from "@nestjs/mapped-types";
import { User } from "../schemas/user.schema";

export class LoginUserDto extends PickType(User, ["email", "password"]) {}