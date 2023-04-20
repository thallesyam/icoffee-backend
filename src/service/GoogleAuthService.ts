import { prisma } from "../server"

type UserProps = {
  sub: string
  name: string
  given_name: string
  family_name: string
  picture: string
  email: string
  email_verified: boolean
  locale: string
}
export class GoogleAuthService {
  constructor() {}

  async execute(user: UserProps, isCompanyLogin = false) {
    const { name, email } = user

    if (isCompanyLogin) {
      const company = await prisma.company.upsert({
        where: {
          ownerEmail: email,
        },
        update: {
          ownerEmail: email,
          ownerName: name,
        },
        create: {
          ownerEmail: email,
          ownerName: name,
        },
      })

      return company
    }

    const userPrisma = await prisma.user.upsert({
      where: {
        email: email,
      },
      update: {
        email,
        name,
      },
      create: {
        email,
        name,
      },
    })

    return userPrisma
  }
}
