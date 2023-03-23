import { NextFunction, Request, Response } from "express";
import { DeleteCompanyService } from "../service/DeleteCompanyService";

export class DeleteCompanyController {
  constructor() {}

  async handle(  
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { id } = request.params

      if (!id) {
        return next(new Error('Company is not provide'));
      }
  
      const deleteCompanyService = new DeleteCompanyService()
      const company = await deleteCompanyService.execute(id)

      if(company instanceof Error) {
        response.status(500).json({ message: 'Error' })
        return
      }

      response.json({ message: 'Companhia deletado' })
    } catch (error) {
      console.log('Failed to update Company', error);
      return response.redirect(`https://icoffe-front.vercel.app`);
    }
  }
}

