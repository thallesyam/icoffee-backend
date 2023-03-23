import { NextFunction, Request, Response } from "express"
import { CreateProductService } from "../service/CreateProductService"

export class CreateProductController {
  constructor() {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { imageUrl, name, description, ownerId, price } = request.body

      if (!imageUrl || !name || !description || !ownerId || !price) {
        return next(new Error("Product is not Provided"))
      }

      const createProductService = new CreateProductService()
      await createProductService.execute({
        imageUrl,
        name,
        description,
        ownerId,
        price,
      })

      response.json({ product: "Produto criado com sucesso!" })
    } catch (error) {
      console.log("Failed to create Product", error)
      return response.redirect(process.env.REDIRECT_URL as string)
    }
  }
}
