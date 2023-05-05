import { prisma } from "../server"

export class GetSessionByIdService {
  constructor() {}

  async execute(checkoutId: string) {
    const session = await prisma.order.findFirst({
      where: {
        checkoutId,
      },
      include: {
        products: {},
      },
    })

    return session
  }
}
