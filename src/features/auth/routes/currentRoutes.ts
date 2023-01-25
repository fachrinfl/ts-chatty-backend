import express, { Router } from 'express';
import { CurrentUser } from '@auth/controllers/current-user';
import { authMiddleware } from '@global/helpers/auth-middleware';

class CurrentUserRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public reoutes(): Router {
    this.router.get(
      '/currentUser',
      authMiddleware.checkAuthentication,
      CurrentUser.prototype.read
    );

    return this.router;
  }
}

export const currentUserRoutes: CurrentUserRoutes = new CurrentUserRoutes();
