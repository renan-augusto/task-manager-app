import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
    private readonly _resend: Resend;

    constructor(
        private _config: ConfigService,
    ) {
        this._resend = new Resend(this._config.get('RESEND_KEY'));
    }

    async sendEmail(email: string, emailToken: string) {
        await this._resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Task manager app - Confirm your account',
            html: `
                <div style="background-color: #f2f2f2; padding: 28px;">
                    <h1 style="color: #333333; font-size: 24px;">Welcome to the task manager app!</h1>
                    <p style="color #666666; font-size: 16px;">Please, confirm your account by clicking on the link bellow to access the platform</p>
                    <div style:"margin-top: 20px; text-align: center;">
                        <p>aplicacaobrabao.com/confirm/${emailToken}</p>
                    </div>
                </div>
            `
        })
    }


}
