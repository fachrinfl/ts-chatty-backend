import { emailQueue } from './../../../shared/services/queues/email.queue';
import { Request, Response } from 'express';
import { config } from '@root/config';
import JWT from 'jsonwebtoken';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import HTTP_STATUS from 'http-status-codes';
import { authServices } from '@service/db/auth.service';
import { BadRequestError } from '@global/helpers/error-handler';
import { loginSchema } from '@auth/schemes/signin';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { IResetPasswordParams, IUserDocument } from '@user/interfaces/user.interface';
import { userService } from '@service/db/user.service';
import moment from 'moment';
import publicIP from 'ip';
import { resetPasswordTemplate } from '@service/emails/templates/reset-password/reset-password-template';

export class SignIn {
  @joiValidation(loginSchema)
  public async read(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const existingUser: IAuthDocument =
      await authServices.getAuthUserByUsername(username);
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch: boolean = await existingUser.comparePassword(
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    const user: IUserDocument = await userService.getUserByAuthId(
      `${existingUser._id}`
    );
    const userJWT: string = JWT.sign(
      {
        userId: user._id,
        uId: existingUser.uId,
        email: existingUser.email,
        username: existingUser.username,
        avatarColor: existingUser.avatarColor,
      },
      config.JWT_TOKEN!
    );

    req.session = { jwt: userJWT };
    const userDocument: IUserDocument = {
      ...user,
      uId: existingUser!.uId,
      email: existingUser!.email,
      username: existingUser!.username,
      avatarColor: existingUser!.avatarColor,
    } as IUserDocument;

    const templateParams: IResetPasswordParams = {
      username: existingUser.username!,
      email: existingUser.email!,
      ipaddress: publicIP.address(),
      date: moment().format('DD/MM/YYYY HH:mm')
    };
    const template: string = resetPasswordTemplate.passwordResetTemplate(templateParams);
    emailQueue.addEmailJob('forgotPasswordEmail', {template, receiverEmail: 'elza.bechtelar@ethereal.email', subject: 'Password reset confirmation'});

    res.status(HTTP_STATUS.OK).json({
      message: 'User login successfully',
      user: userDocument,
      token: userJWT,
    });
  }
}
