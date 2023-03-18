import { prisma } from "../server";

export class GetUserByEmailService {
  constructor() {}

  async execute(  
    email: string
  ) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    })

    if(!user) {
      return new Error('User not found')
    }

    return user
  }
}

