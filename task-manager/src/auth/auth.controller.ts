import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create.user.dto';
import { AuthDto } from './dto';
import { JwtGuard } from './guard';
import { ITokenValidated } from 'src/interfaces/token-validated.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private _authService: AuthService) {}

    @Post('signup')
    signup(@Body() dto: CreateUserDto) {
        return this._authService.signup(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this._authService.signin(dto);
    }

    @HttpCode(HttpStatus.ACCEPTED)
    @Post('validate-token')
    @UseGuards(JwtGuard) 
    validateToken() {
        const response: ITokenValidated = {
            message: "Successful validate token",
            statusCode: HttpStatus.ACCEPTED
        }

        return response;
    }
}

