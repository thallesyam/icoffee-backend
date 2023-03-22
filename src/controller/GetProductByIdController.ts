import { NextFunction, Request, Response } from "express";
import { GetProductByCompanyService } from "../service/GetProductByCompanyService";
import { GetProductByIdService } from "../service/GetProductByIdService";

export class GetProductByIdController {
  constructor() {}

  async handle(  
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { id } = request.params

      if (!id) {
        return next(new Error('Product is not provide'));
      }
  
      const getProductByIdService = new GetProductByIdService()
      const product = await getProductByIdService.execute(id)

      if(product instanceof Error) {
        response.status(500).json({ message: 'Error' })
        return
      }

      response.json({product})
    } catch (error) {
      console.log('Failed to get Product', error);
      return response.redirect(`http://www.localhost:3000`);
    }
  }
}
