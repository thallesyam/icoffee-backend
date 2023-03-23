import { NextFunction, Request, Response } from "express"
import { GetProductByCompanyService } from "../service/GetProductByCompanyService"

export class GetProductByCompanyController {
  constructor() {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { ownerId } = request.params

      if (!ownerId) {
        return next(new Error("Product is not provide"))
      }

      const getProductByCompanyService = new GetProductByCompanyService()
      const product = await getProductByCompanyService.execute(ownerId)

      if (product instanceof Error) {
        response.status(500).json({ message: "Error" })
        return
      }

      response.json({ product })
    } catch (error) {
      console.log("Failed to get Product", error)
      return response.redirect(process.env.REDIRECT_URL as string)
    }
  }
}
