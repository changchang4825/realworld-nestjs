import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserRepogitory } from 'src/user/user.repogitory';
import { UserService } from 'src/user/user.service';
import { Payload } from './jwt/jwt.payload';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        private readonly userRepogitory: UserRepogitory,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(loginUserDto: LoginUserDto) {
        const { email, password } = loginUserDto;
        const user = await this.userRepogitory.findUserByEmail(email);
        if (!user) throw new UnauthorizedException('Incorrect email or password.');

        const passwordValidation = await bcrypt.compare(password, user.password);
        if (!passwordValidation) throw new UnauthorizedException('Incorrect email or password.');
        
        const jwt = await this.generateJwt({ email, sub: user.id });
        return this.userService.responseUser(user, jwt);
    }

    async generateJwt(payload: Payload) {
        return this.jwtService.signAsync(payload);
    }
}
