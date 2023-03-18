import { prisma } from "../server";

export class GetCompanyByEmailService {
  constructor() {}

  async execute(  
    email: string
  ) {
    const company = await prisma.company.findUnique({
      where: {
        ownerEmail: email,
      }
    })

    if(!company) {
      return new Error('Company not found')
    }

    return company
  }
}

