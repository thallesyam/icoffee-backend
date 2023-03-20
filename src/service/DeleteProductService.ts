import { prisma } from "../server";

export class DeleteProductService {
  constructor() {}

  async execute(  
    id: string
  ) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      }
    })

    if(!product) {
      return new Error('Product not found')
    }

    await prisma.product.delete({
      where: {
        id
      }
    })

    return
  }
}

