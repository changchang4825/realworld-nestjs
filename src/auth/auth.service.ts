import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserRepogitory } from 'src/user/user.repogitory';
import { Payload } from './jwt/jwt.payload';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepogitory: UserRepogitory,
        private readonly jwtService: JwtService
    ) {}

    async login(loginUserDto: LoginUserDto) {
        const { email, password } = loginUserDto;
        const user = await this.userRepogitory.findUserByEmail(email);
        if (!user) throw new UnauthorizedException('Incorrect email or password.');

        const passwordValidation = await bcrypt.compare(password, user.password);
        if (!passwordValidation) throw new UnauthorizedException('Incorrect email or password.');
        
        
    }

    async generateJwt(payload: Payload) {
        return await this.jwtService.signAsync(payload);
    }
}
