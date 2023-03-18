import { NextFunction, Request, Response } from "express";
import { GoogleAuthService } from "../service/GoogleAuthService";

export class GoogleAuthController {
  constructor() {}

  async handle(  
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const code = request.query.code as string;

      if (!code) {
        return next(new Error('Authorization code not provided!'));
      }
  
      const googleAuthService = new GoogleAuthService()
      await googleAuthService.execute(code)
      
      response.redirect('http://www.localhost:3000')
    } catch (error) {
      console.log('Failed to authorize Google User', error);
      return response.redirect(`http://www.localhost:3000`);
    }
  }
}

