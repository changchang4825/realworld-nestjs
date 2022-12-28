import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { LoginUserClass } from './dto/login-user.dto';

@Controller()
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Post('users')
	async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
		return this.userService.createUser(createUserDto);
	}

	@Get('user')
	async getUser() {
		return this.userService.getUser();
	}

	@Put('user')
	async updateUser(@Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(updateUserDto);
	}

    @Post('users/login')
    async loginUser(@Body() loginUserDto: LoginUserClass) {
        return this.userService.loginUser(loginUserDto);
    }

	// @Get()
	// findAll() {
	// 	return this.userService.findAll();
	// }

	// @Get(':id')
	// findOne(@Param('id') id: string) {
	// 	return this.userService.findOne(+id);
	// }

	// @Patch(':id')
	// update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
	// 	return this.userService.update(+id, updateUserDto);
	// }

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return this.userService.remove(+id);
	// }
}
