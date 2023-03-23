import { NextFunction, Request, Response } from "express";
import { DeleteProductService } from "../service/DeleteProductService";

export class DeleteProductController {
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
  
      const deleteProductService = new DeleteProductService()
      const product = await deleteProductService.execute(id)

      if(product instanceof Error) {
        response.status(500).json({ message: 'Error' })
        return
      }

      response.json({ message: 'Produto deletado' })
    } catch (error) {
      console.log('Failed to update Product', error);
      return response.redirect(`https://icoffe-front.vercel.app/`);
    }
  }
}

