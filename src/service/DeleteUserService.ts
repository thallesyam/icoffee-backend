import { prisma } from "../server";

export class DeleteUserService {
  constructor() {}

  async execute(  
    id: string
  ) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      }
    })

    if(!user) {
      return new Error('User not found')
    }

    await prisma.user.delete({
      where: {
        id
      }
    })

    return
  }
}

