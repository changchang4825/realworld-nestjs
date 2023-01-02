import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UserRepogitory {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async createUser(createUserDto: CreateUserDto) {
        return await this.userModel.create(createUserDto);
    }

    async findUserByEmail(email: string) {
        return await this.userModel.findOne({ email: email }).lean();
    }

    async findUserById(id: string): Promise<User> {
        return await this.userModel.findById(id).select('-password');
    }
}