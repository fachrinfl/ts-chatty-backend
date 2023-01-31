import fs from 'fs';
import ejs from 'ejs';
import { IResetPasswordParams } from '@user/interfaces/user.interface';

class ResetPasswordTemplate {
  public passwordResetTemplate(templateParams: IResetPasswordParams): string {
    const {username, email, ipaddress, date} = templateParams;
    return ejs.render(fs.readFileSync(__dirname + '/reset-password-template.ejs', 'utf8'), {
      username,
      email,
      ipaddress,
      date,
      image_url: 'https://w7.pngwing.com/pngs/300/149/png-transparent-password-account-security-reset-safety-change-update-cyber-security-solid-threat-protection-icon.png'
    });
  }
}

export const resetPasswordTemplate: ResetPasswordTemplate = new ResetPasswordTemplate();
