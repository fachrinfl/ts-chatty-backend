import { CustomError } from '@global/helpers/error-handler';
import { Request, Response } from 'express';
import { SignUp } from '@auth/controllers/signup';
import { authMockRequest, authMockResponse } from '@root/mocks/auth.mock';

jest.mock('@service/queues/base.queue');
jest.mock('@service/redis/user.cache');
jest.mock('@service/queues/user.queue');
jest.mock('@service/queues/auth.queue');
jest.mock('@global/helpers/cloudinary-upload');

describe('SignUp', () => {
  it('should throw an error if username is not available', () => {
    const req: Request = authMockRequest({}, {
      username: '',
      email: 'manny@test.com',
      password: 'qwerty',
      avatarColor: 'red',
      avatarImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnQAAAL2CAYAAADIEQscAAA'
    }) as Request;
    const res: Response = authMockResponse();

    SignUp.prototype.create(req, res).catch((error: CustomError) => {
      expect(error.statusCode).toEqual(400);
      expect(error.serializeError().message).toEqual('Username is a required field');
    });
  });
});
