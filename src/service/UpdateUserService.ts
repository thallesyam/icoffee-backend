import { User } from "@prisma/client";
import { prisma } from "../server";

export class UpdateUserService {
  constructor() {}

  async execute(  
    user: User
  ) {
    const userExists = await prisma.user.findUnique({
      where: {
        id: user.id,
      }
    })

    if(!userExists) {
      return new Error('User not found')
    }

    const userUpdated = await prisma.user.update({
      where: {
        id: userExists.id
      },
      data: {
        ...user
      }
    })

    return userUpdated
  }
}

