import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';

@Module({
    imports: [
        ConfigModule.forRoot(), // check
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1y' },
        }),
        forwardRef(() => UserModule)
    ],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}
