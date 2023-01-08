import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UserRepogitory } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepogitory: UserRepogitory,
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
        const { username, email, password } = createUserDto;
        if (await this.userRepogitory.findUserByEmail(email)) throw new UnauthorizedException('This email address is already in use.');
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userRepogitory.createUser({ username, email, password: hashedPassword });
        const jwt = await this.authService.generateJwt({ email, sub: user.id });

        return this.responseUser(user, jwt);
    }

    getUser() {

    }

    updateUser(updateUserDto: UpdateUserDto) {

    }

    async responseUser(user: User, jwt: string): Promise<ResponseUserDto> {
        return {
            "user": {
                email: user.email,
                token: jwt,
                username: user.username,
                bio: user.bio,
                image: user.image
            }
        }
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
