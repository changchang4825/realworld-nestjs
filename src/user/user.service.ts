import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UserRepogitory } from './user.repogitory';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepogitory: UserRepogitory,
        private readonly authService: AuthService
    ) { }

    async createUser(createUserDto: CreateUserDto) {
        const { username, email, password } = createUserDto;
        // const check = await this.userRepogitory.findUserByEmail(email);
        // console.log(email, check);
        if (await this.userRepogitory.findUserByEmail(email)) throw new UnauthorizedException('This email address is already in use.');

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userRepogitory.createUser({ username, email, password: hashedPassword });
        const jwt = this.authService.generateJwt({ email, sub: user.id });
        return user;
    }

    async getUser() {

    }

    // async findUserByEmail(email: string): Promise<User | null> {
    //     return this.userRepogitory.findUser(email);
    // }

    updateUser(updateUserDto: UpdateUserDto) {

    }

    loginUser(loginUserDto: LoginUserDto) {

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
