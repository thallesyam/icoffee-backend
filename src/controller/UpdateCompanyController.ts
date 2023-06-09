import { NextFunction, Request, Response } from "express"
import { UpdateCompanyService } from "../service/UpdateCompanyService"

export class UpdateCompanyController {
  constructor() {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const company = request.body

      if (!company.ownerName || !company.ownerEmail || !company.id) {
        return next(new Error("Company is not Provided"))
      }

      const updateCompanyService = new UpdateCompanyService()
      const companyUpdated = await updateCompanyService.execute(company)

      if (companyUpdated instanceof Error) {
        response.status(500).json({ message: "Error" })
        return
      }
      response
        .cookie("@icoffee:user", JSON.stringify(companyUpdated), {
          httpOnly: false,
        })
        .json({ company: companyUpdated })
    } catch (error) {
      console.log("Failed to update Company", error)
      return response.redirect(process.env.REDIRECT_URL as string)
    }
  }
}
