import { NextFunction, Request, Response } from "express"
import { GetSessionByIdService } from "../service/GetSessionByIdService"

export class GetSessionByIdController {
  constructor() {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { checkoutId } = request.params

      if (!checkoutId) {
        return next(new Error("Session is not Provided"))
      }

      const getSessionByIdService = new GetSessionByIdService()
      const session = await getSessionByIdService.execute(checkoutId)

      if (session instanceof Error) {
        response.status(500).json({ message: "Error" })
        return
      }

      response.json({ session })
    } catch (error) {
      console.log("Failed to get Product", error)
      return response.redirect(process.env.REDIRECT_URL as string)
    }
  }
}
