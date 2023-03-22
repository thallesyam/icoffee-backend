import { prisma } from "../server";

export class GetProductByIdService {
  constructor() {}

  async execute(  
    id: string
  ) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },

    })

    return product
  }
}

