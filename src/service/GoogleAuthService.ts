import { prisma } from "../server";
import { getGoogleOauthToken, getGoogleUser } from "../utils/session";

export class GoogleAuthService {
  constructor() {}

  async execute(  
    code: string,
    isCompanyLogin = false
  ) {
    const { id_token, access_token } = await getGoogleOauthToken({ code });

    const { name, email } = await getGoogleUser({
      id_token,
      access_token,
    });

    if(isCompanyLogin) {
      const company = await prisma.company.upsert({
        where: {
          ownerEmail: email
        },
        update: {
          ownerEmail: email,
          ownerName: name 
        },
        create: {
          ownerEmail: email,
          ownerName: name
        }
      })

      return company
    }

    const user = await prisma.user.upsert({
      where: {
        email: email
      },
      update: {
        email,
        name 
      },
      create: {
        email,
        name
      }
    })

    return user
  }
}

