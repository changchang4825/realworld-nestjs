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
        // const createdUser = await new this.userModel(createUserDto);
        // return await createdUser.save();
    }

    async getUser() {
        
    }

    async findUserByEmail(email: string) {
        return await this.userModel.findOne({ email: email }); // .lean()
    }
}