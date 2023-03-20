import { Company } from "@prisma/client";
import { prisma } from "../server";

export class UpdateCompanyService {
  constructor() {}

  async execute(  
    company: Company
  ) {
    const companyExists = await prisma.company.findUnique({
      where: {
        id: company.id,
      }
    })

    if(!companyExists) {
      return new Error('Company not found')
    }

    const companyUpdated = await prisma.company.update({
      where: {
        id: companyExists.id
      },
      data: {
        ...company
      }
    })

    return companyUpdated
  }
}

