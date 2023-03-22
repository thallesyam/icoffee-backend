import { prisma } from "../server";

export class DeleteCompanyService {
  constructor() {}

  async execute(  
    id: string
  ) {
    const company = await prisma.company.findUnique({
      where: {
        id,
      }
    })

    if(!company) {
      return new Error('Company not found')
    }

    await prisma.company.update({
      data: {
        Product: {
          deleteMany: {}
        }
      },
      where: {
        id
      },
    })

    await prisma.company.delete({
      where: {
        id
      },
    })

    return
  }
}

