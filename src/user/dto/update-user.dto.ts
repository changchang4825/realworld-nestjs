import { PickType } from '@nestjs/mapped-types';
import { User } from '../schemas/user.schema';

export class UpdateUserDto extends PickType(User, ["email", "bio", "image"]) {}
