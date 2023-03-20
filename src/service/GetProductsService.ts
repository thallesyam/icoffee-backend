import { prisma } from "../server";

export class GetProductsService {
  constructor() {}

  async execute(  
    
  ) {
    const products = await prisma.product.findMany({ include: { company: {} } })

    return products || []
  }
}

