import { NextFunction, Request, Response } from "express"
import { GetUserByEmailService } from "../service/GetUserByEmailService"

export class GetUserByEmailController {
  constructor() {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { email } = request.params

      if (!email) {
        return next(new Error("User is not provide"))
      }

      const getUserByEmailService = new GetUserByEmailService()
      const user = await getUserByEmailService.execute(email)

      if (user instanceof Error) {
        response.status(500).json({ message: "Error" })
        return
      }

      response.json({ user })
    } catch (error) {
      console.log("Failed to update User", error)
      return response.redirect(process.env.REDIRECT_URL as string)
    }
  }
}
