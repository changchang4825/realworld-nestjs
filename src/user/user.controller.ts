import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller()
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly authService: AuthService
	) { }

	@Post('users')
	async createUser(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
		return await this.userService.createUser(createUserDto);
	}

	@Get('user')
	async getUser() {
		return this.userService.getUser();
	}

	@Put('user')
	async updateUser(@Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(updateUserDto);
	}

	// @UseGuards(JwtAuthGuard)
    @Post('users/login')
    async loginUser(@Body() loginUserDto: LoginUserDto) {
        return this.authService.validateUser(loginUserDto);
    }
}
