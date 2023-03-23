import { NextFunction, Request, Response } from "express";
import { GetCompanyByEmailService } from "../service/GetCompanyByEmailService";

export class GetCompanyByEmailController {
  constructor() {}

  async handle(  
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { ownerEmail } = request.params

      if (!ownerEmail) {
        return next(new Error('Company is not provide'));
      }
  
      const getCompanyByEmailService = new GetCompanyByEmailService()
      const company = await getCompanyByEmailService.execute(ownerEmail)

      if(company instanceof Error) {
        response.status(500).json({ message: 'Error' })
        return
      }

      response.json({company})
    } catch (error) {
      console.log('Failed to update Company', error);
      return response.redirect(`https://icoffe-front.vercel.app/`);
    }
  }
}

