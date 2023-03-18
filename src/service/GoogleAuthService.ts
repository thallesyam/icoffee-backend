import { getGoogleOauthToken, getGoogleUser } from "../utils/session";

export class GoogleAuthService {
  constructor() {}

  async execute(  
    code: string
  ) {
    const { id_token, access_token } = await getGoogleOauthToken({ code });

    const { name, verified_email, email, picture } = await getGoogleUser({
      id_token,
      access_token,
    });

    console.log({
      name,
      verified_email,
      email,
      picture
    });
      
    return 'ok'
  }
}

