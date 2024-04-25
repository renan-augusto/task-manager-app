import { ForbiddenException, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { CreateUserDto } from './dto/create.user.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { randomUUID } from 'crypto';
import { EmailService } from 'src/email/email.service';
import { IUserLogged } from 'src/interfaces/user-logged.interface';

@Injectable()
export class AuthService implements OnModuleInit {
    constructor(
        private _prisma: PrismaService,
        private _jwt: JwtService,
        private _config: ConfigService,
        private _emailService: EmailService
    ) {}
    onModuleInit() {
    }

    async signup(dto: CreateUserDto) {
        try {
            const hash = await argon.hash(dto.password);

            const nameValidationRegex = /^[a-zA-Z\s\-']+$/;

            if(!nameValidationRegex.test(dto.firstName) || !nameValidationRegex.test(dto.lastName)) {
                throw new ForbiddenException('First name or last name should not contains special chars');
            }
            if(dto.firstName.includes(' ') || dto.lastName.includes(' ')) {
                throw new ForbiddenException('Only single first and last names are allowed');
            }

            const user = await this._prisma.user.create({
                data: {
                    email: dto.email.toLowerCase(),
                    hash,
                    firstName: dto.firstName.toLowerCase(),
                    lastName: dto.lastName.toLowerCase(),
                    validateEmailToken: randomUUID(),
                },
                select: {
                    id: true,
                    email: true,
                    createdAt: true,
                    validateEmailToken: true,
                }
            })

            await this._emailService.sendEmail(user.email, user.validateEmailToken);

            return user;
        } catch (err) {
            if(err instanceof PrismaClientKnownRequestError) {
                if(err.code === 'P2002') {
                    throw new ForbiddenException('Credentials already taken')
                }
            }
            throw err;
        }
    }

    async signin(dto: AuthDto) {
        const user = await this._prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        });

        if(!user) {
            throw new ForbiddenException(
                'Credentials incorrect',
            );
        };

        const pswMatches = await argon.verify(
            user.hash,
            dto.password
        );

        if(!pswMatches) {
            throw new ForbiddenException(
                'Incorrect credentials'
            );
        };
        
        const token = await this.signToken(user.id, user.email)

        const userLogged: IUserLogged = {
            access_token: token.access_token,
            id: user.id
        }
        
        return userLogged;

    }

    async signToken(userId: number, email: string): Promise<{access_token: string}> {
        const payload = {
            sub: userId,
            email
        };

        const secret = this._config.get('JWT_SECRET')

        const token = await this._jwt.signAsync(payload, {
            expiresIn: '25min',
            secret: secret
        });

        return {
            access_token: token,
        };
    }
}
