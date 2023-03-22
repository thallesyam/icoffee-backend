import { NextFunction, Request, Response } from "express";
import { UpdateCompanyService } from "../service/UpdateCompanyService";
import { UpdateProductService } from "../service/UpdateProductService";

export class UpdateProductController {
  constructor() {}

  async handle(  
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { 
        productId,
        imageUrl,
        name,
        description,
        ownerId,
        price 
      } = request.body

      if (!productId || !imageUrl || !name || !description || !ownerId || !price) {
        return next(new Error('Product is not provide'));
      }
  
      const updateProductService = new UpdateProductService()
      const productUpdated = await updateProductService.execute({ 
        imageUrl,
        name,
        description,
        productId,
        ownerId,
        price  
      })
      
      if(productUpdated instanceof Error) {
        response.status(500).json({ message: 'Error' })
        return
      }

      response.json({product: productUpdated})
    } catch (error) {
      console.log('Failed to update Company', error);
      return response.redirect(`https://icoffe-front-g1r6.vercel.app/`);
    }
  }
}

