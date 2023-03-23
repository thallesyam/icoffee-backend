import { NextFunction, Request, Response } from "express"
import { GoogleAuthService } from "../service/GoogleAuthService"
export class GoogleAuthController {
  constructor() {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const code = request.query.code as string
      const queryState = request.query.state as string
      const isCompanyLogin = queryState.split("type=")?.[1] === "company"

      if (!code) {
        return next(new Error("Authorization code not provided!"))
      }

      const googleAuthService = new GoogleAuthService()
      const user = await googleAuthService.execute(code, isCompanyLogin)

      response
        .cookie("@icoffee:user", JSON.stringify(user), {
          httpOnly: false,
          sameSite: "none",
          secure: true,
        })
        .redirect(process.env.REDIRECT_URL as string)
      next()
    } catch (error) {
      console.log("Failed to authorize Google User", error)
      return response.redirect(process.env.REDIRECT_URL as string)
    }
  }
}
