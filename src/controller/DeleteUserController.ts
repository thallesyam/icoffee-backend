import { NextFunction, Request, Response } from "express";
import { DeleteUserService } from "../service/DeleteUserService";

export class DeleteUserController {
  constructor() {}

  async handle(  
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { id } = request.params

      if (!id) {
        return next(new Error('User is not provide'));
      }
  
      const deleteUserService = new DeleteUserService()
      const user = await deleteUserService.execute(id)

      if(user instanceof Error) {
        response.status(500).json({ message: 'Error' })
        return
      }

      response.json({ message: 'Usuário deletado' })
    } catch (error) {
      console.log('Failed to update User', error);
      return response.redirect(`https://icoffe-front.vercel.app`);
    }
  }
}

