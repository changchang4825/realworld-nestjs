import { PickType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PickType(CreateUserDto, ["email"]) {
    @IsString()
    bio: string;

    @IsString()
    image: string;
}
