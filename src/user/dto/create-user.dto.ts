import { PickType } from "@nestjs/mapped-types";
import { User } from "../schemas/user.schema";

export class CreateUserDto extends PickType(User, ["username", "email", "password"]) {}
