import { jwtPrivateKey } from "@/config/constants";
import UnauthorizedError from "@/errors/UnauthorizedError";
import { JwtHelper } from "@/helpers/jwt.helper";
import userModel from "@/models/user.model";
import userAuthTokenModel from "@/models/userAuthToken.model";
import {
    type NextFunction,
    type Response,
    type Request,
  } from "express"
const jwtHelper = new JwtHelper({
    privateKey: jwtPrivateKey,
    UserTokenDb: userAuthTokenModel,
  });
const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    try {
        const decoded = await jwtHelper.verifyToken(token);
        const user = await userAuthTokenModel.findOne({
            email: decoded.email,
            token: token,
        });
        if(!user) {
          throw new UnauthorizedError();
        }

        req.token = token;
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
}

export default  authMiddleware