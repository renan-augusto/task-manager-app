import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create.user.dto';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private _authService: AuthService) {}

    @Post('signup')
    signup(@Body() dto: CreateUserDto) {
        return this._authService.signup(dto);
    }

    @Post('singin')
    signin(@Body() dto: AuthDto) {
        return this._authService.signin(dto);
    }
}
