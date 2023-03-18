import { NextFunction, Request, Response } from "express";
import { UpdateUserService } from "../service/UpdateUserService";

export class UpdateUserController {
  constructor() {}

  async handle(  
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const user = request.body

      if (!user.name || !user.email || !user.id) {
        return next(new Error('User is not provider'));
      }
  
      const updateUserService = new UpdateUserService()
      const userUpdated = await updateUserService.execute(user)
      
      if(userUpdated instanceof Error) {
        response.status(500).json({ message: 'Error' })
        return
      }

      response.json({user: userUpdated})
    } catch (error) {
      console.log('Failed to update User', error);
      return response.redirect(`http://www.localhost:3000`);
    }
  }
}

