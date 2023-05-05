import express from "express"
import passport from "passport"

import { GoogleAuthController } from "./controller/GoogleAuthController"

import { UpdateUserController } from "./controller/UpdateUserController"
import { GetUserByEmailController } from "./controller/GetUserByEmailController"
import { DeleteUserController } from "./controller/DeleteUserController"

import { UpdateCompanyController } from "./controller/UpdateCompanyController"
import { GetCompanyByEmailController } from "./controller/GetCompanyByEmailController"
import { DeleteCompanyController } from "./controller/DeleteCompanyController"
import { CreateProductController } from "./controller/CreateProductController"
import { UpdateProductController } from "./controller/UpdateProductController"
import { DeleteProductController } from "./controller/DeleteProductController"
import { GetProductByCompanyController } from "./controller/GetProductByCompanyController"
import { GetProductsController } from "./controller/GetProductsController"
import { GetProductByIdController } from "./controller/GetProductByIdController"
import { PaymentController } from "./controller/PaymentController"
import { PaymentWebhookController } from "./controller/PaymentWebhookController"
import { GetSessionByIdController } from "./controller/GetSessionByIdController"

const routes = express.Router()

// Rota de login do google e responsável pela primeira criação de usuário ou empresa no banco

routes.get("/auth/google", (request, response, next) => {
  const query = request.query

  const authenticator = passport.authenticate("google", {
    scope: ["profile", "email"],
    state: query ? JSON.stringify(query.type) : undefined,
  })
  authenticator(request, response, next)
})

routes.get(
  "/api/auth/google/callback",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  new GoogleAuthController().handle
)

// User
routes.put("/user", new UpdateUserController().handle)
routes.get("/user/:email", new GetUserByEmailController().handle)
routes.delete("/user/:id", new DeleteUserController().handle)

// Company
routes.put("/company", new UpdateCompanyController().handle)
routes.get("/company/:ownerEmail", new GetCompanyByEmailController().handle)
routes.delete("/company/:id", new DeleteCompanyController().handle)

// Product
routes.post("/product", new CreateProductController().handle)
routes.put("/product", new UpdateProductController().handle)
routes.delete("/product/:id", new DeleteProductController().handle)
routes.get("/product/:id", new GetProductByIdController().handle)
routes.get(
  "/product/company/:ownerId",
  new GetProductByCompanyController().handle
)
routes.get("/products", new GetProductsController().handle)

routes.get("/session/:checkoutId", new GetSessionByIdController().handle)

routes.post("/payment", new PaymentController().handle)
routes.post("/payment/webhook", new PaymentWebhookController().handle)

export { routes }
