import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserClass } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepogitory } from './user.repogitory';

@Injectable()
export class UserService {
    constructor(private readonly userRepogitory: UserRepogitory) {}

    async createUser(createUserDto: CreateUserDto) {
        const { username, email, password } = createUserDto;
        const user = this.userRepogitory.createUser({ username, email, password });
        return user;
    }

    getUser() {

    }

    updateUser(updateUserDto: UpdateUserDto) {

    }

    loginUser(loginUserDto: LoginUserClass) {

    }

    // findAll() {
    //     return `This action returns all user`;
    // }

    // findOne(id: number) {
    //     return `This action returns a #${id} user`;
    // }

    // update(id: number, updateUserDto: UpdateUserDto) {
    //     return `This action updates a #${id} user`;
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} user`;
    // }
}
