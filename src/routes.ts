import express from 'express';
import { GoogleAuthController } from './controller/GoogleAuthController'

const routes = express.Router();

routes.get('/api/auth/google/callback', new GoogleAuthController().handle);

export {
  routes
}
