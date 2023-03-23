import { NextFunction, Request, Response } from "express";
import { GetProductsService } from "../service/GetProductsService";

export class GetProductsController {
  constructor() {}

  async handle(  
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const getProductsService = new GetProductsService()
      const products = await getProductsService.execute()

      response.json({products})
    } catch (error) {
      console.log('Failed to get Product', error);
      return response.redirect(`https://icoffe-front.vercel.app`);
    }
  }
}

