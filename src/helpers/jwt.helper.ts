import { CustomError } from "@/errors/CustomError";
import { JwtConfig } from "./types";
import * as jwt from "jsonwebtoken";
import UnauthorizedError from "@/errors/UnauthorizedError";

interface GenerateTokenParam {
  email: string;
  userId?: string;
  expiresIn?: number;
}

/**
 * Helper class for working with JSON Web Tokens (JWT).
 */
export class JwtHelper {
  private configOption: JwtConfig;
  handleJsonResponse?: Function;
  UserTokenDb: any;

  /**
   * Constructs a new instance of JwtHelper.
   * @param configOption - The configuration options for JWT.
   */
  constructor(configOption: JwtConfig) {
    this.configOption = configOption;
    this.handleJsonResponse =
      configOption.handleJsonResponse;
    this.UserTokenDb = configOption.UserTokenDb;
  }

  /**
   * Generates a JWT token based on the provided payload.
   * @param body - The payload for the token.
   * @returns The generated JWT token.
   */
  generateToken(body: GenerateTokenParam) {
    const encryptionKey = Buffer.from(
      this.configOption.privateKey,
      "base64"
    ).toString();
    const token = jwt.sign(body, encryptionKey, {
      expiresIn: body.expiresIn || "1W",
    });
    return token;
  }

  /**
   * Verifies the authenticity of a JWT token.
   * @param token - The JWT token to verify.
   * @returns A Promise that resolves to the decoded token payload.
   * @throws UnauthorizedError if the token is invalid or expired.
   */
  async verifyToken(
    token: string
  ): Promise<GenerateTokenParam> {
    try {
      const result = await jwt.verify(
        token,
        Buffer.from(
          this.configOption.privateKey,
          "base64"
        ).toString()
      );
      return result as GenerateTokenParam;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedError({
        code: 401,
        message: "User is not authorized",
        logging: true,
      });
    }
  }
}
