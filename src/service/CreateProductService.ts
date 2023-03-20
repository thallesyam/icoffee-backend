import { Company, Product } from "@prisma/client";
import { prisma } from "../server";

type CreateProductServiceProps = {
  imageUrl: string
  name: string
  description: string
  ownerId: string
  price: number
}

export class CreateProductService {
  constructor() {}

  async execute({
    imageUrl,
    name,
    description,
    ownerId,
    price 
  }: CreateProductServiceProps) {
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
    
    if(hasProductWithSameName) {
      return new Error('Product already exists!')
    }

    const product = await prisma.product.create({
      data: {
        imageUrl,
        name,
        description,
        price,
        company: {
          connect: {
            id: ownerId
          }
        }
      }
    })

    return product
  }
}

