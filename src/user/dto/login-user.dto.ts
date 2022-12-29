import { PickType } from "@nestjs/mapped-types";
import { User } from "../schemas/user.schema";

export class LoginUserClass extends PickType(User, ["email", "password"]) {}