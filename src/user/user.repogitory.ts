import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UserRepogitory {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }
}