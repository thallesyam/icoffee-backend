
import { prisma } from "../server";

type UpdateProductServiceProps = {
  productId: string
  imageUrl: string
  name: string
  description: string
  ownerId: string
  price: number
}


export class UpdateProductService {
  constructor() {}

  async execute({
    productId,
    imageUrl,
    name,
    description,
    ownerId,
    price 
  }: UpdateProductServiceProps) {
    const owner = await prisma.company.findUnique({
      where: {
        id: ownerId,
      },
      include: {
        Product: {
          where: {
            name
          }
        }
      }
    })

    const hasProductWithSameName = !!owner?.Product.length
    
    if(!hasProductWithSameName) {
      return new Error('Product is not exists!')
    }
    const productUpdated = await prisma.product.update({
      where: {
        id: productId
      },
      data: {
        imageUrl,
        name,
        description,
        price
      }
    })

    return productUpdated
  }
}

