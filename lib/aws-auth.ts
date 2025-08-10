"use server";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import { getUserByEmail } from "./actions/user.action";
import { createSession } from "./session";

const poolData = {
  UserPoolId: "us-east-1_NUUWxT5qJ",
  ClientId: "4go3avqj86smbi2lrfu5s3jqog",
};

const userPool = new CognitoUserPool(poolData);

export async function signInCognitoUser(username: string, password: string) {
  const authenticationDetails = new AuthenticationDetails({
    Username: username,
    Password: password,
  });

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  try {
    const result = await new Promise<CognitoUserSession>((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => resolve(result),
        onFailure: (err) => reject(err),
      });
    });

    const idToken = result.getIdToken().getJwtToken();
    const accessToken = result.getAccessToken().getJwtToken();
    const refreshToken = result.getRefreshToken().getToken();
    const user = await getUserByEmail(username);
    await createSession({ accessToken, refreshToken, user: user[0] });

    return { idToken, accessToken, refreshToken, user: user[0] };
  } catch (error) {
    console.log(error);
    1;
    return { error: error };
  }
}

export async function getCredentialsFromEnv() {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  if (!accessKeyId || !secretAccessKey) {
    throw new Error("AWS credentials are not set in environment variables");
  }
  return {
    accessKeyId,
    secretAccessKey,
  };
}
