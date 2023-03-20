import { prisma } from "../server";

export class GetProductByCompanyService {
  constructor() {}

  async execute(  
    ownerId: string
  ) {
    const owner = await prisma.company.findUnique({
      where: {
        id: ownerId,
      },
      include: {
        Product: {
          include: {
            company: {}
          }
        }
      }
    })

    return owner?.Product || []
  }
}

