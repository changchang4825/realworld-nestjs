import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepogitory } from 'src/user/user.repository';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userRepogitory: UserRepogitory) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
            ignoreExpiration: false
        });
    }

    async validate(payload: Payload) {
        const user = await this.userRepogitory.findUserById(payload.sub);

        if (user) {
            return user; // request.user에 해당 내용을 넣어준다 (Passport 라이브러리가 해줌)
        } else {
            throw new UnauthorizedException('Invalid access.');
        }
    }
}