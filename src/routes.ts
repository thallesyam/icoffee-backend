import express from 'express';

import { GoogleAuthController } from './controller/GoogleAuthController'

import { UpdateUserController } from './controller/UpdateUserController'
import { GetUserByEmailController } from './controller/GetUserByEmailController'
import { DeleteUserController } from './controller/DeleteUserController';

import { UpdateCompanyController } from './controller/UpdateCompanyController'
import { GetCompanyByEmailController } from './controller/GetCompanyByEmailController'
import { DeleteCompanyController } from './controller/DeleteCompanyController';
import { CreateProductController } from './controller/CreateProductController';
import { UpdateProductController } from './controller/UpdateProductController';
import { DeleteProductController } from './controller/DeleteProductController';
import { GetProductByCompanyController } from './controller/GetProductByCompanyController';
import { GetProductsController } from './controller/GetProductsController';

const routes = express.Router();

// Rota de login do google e responsável pela primeira criação de usuário ou empresa no banco
routes.get('/api/auth/google/callback', new GoogleAuthController().handle);

// User
routes.put('/user', new UpdateUserController().handle)
routes.get('/user/:email', new GetUserByEmailController().handle)
routes.delete('/user/:id', new DeleteUserController().handle)

// Company
routes.put('/company', new UpdateCompanyController().handle)
routes.get('/company/:ownerEmail', new GetCompanyByEmailController().handle)
routes.delete('/company/:id', new DeleteCompanyController().handle)

// Product
routes.post('/product', new CreateProductController().handle)
routes.put('/product', new UpdateProductController().handle)
routes.delete('/product/:id', new DeleteProductController().handle)
routes.get('/product/:ownerId', new GetProductByCompanyController().handle)
routes.get('/products', new GetProductsController().handle)


export {
  routes
}
