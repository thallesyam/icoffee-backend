import { NextFunction, Request, Response } from "express"
import { GoogleAuthService } from "../service/GoogleAuthService"

type UserProps = {
  sub: string
  name: string
  given_name: string
  family_name: string
  picture: string
  email: string
  email_verified: boolean
  locale: string
}
export class GoogleAuthController {
  constructor() {}

  async handle(request: Request, response: Response) {
    try {
      const data = request.user as UserProps
      const isCompanyLogin = !!request.query?.state

      const googleAuthService = new GoogleAuthService()
      const user = await googleAuthService.execute(data, isCompanyLogin)
      const userToString = JSON.stringify(user)

      return response.status(200).send(
        `<!DOCTYPE html>
          <html lang="en">
            <body>
            </body>
            <script>
              window.opener.postMessage(${userToString}, 'http://localhost:3000')
            </script>
          </html>`
      )
    } catch (error) {
      console.log("Failed to authorize Google User", error)
      return response.redirect(process.env.REDIRECT_URL as string)
    }
  }
}
