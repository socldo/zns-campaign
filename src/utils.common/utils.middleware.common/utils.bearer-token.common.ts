import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    let bearerToken: string = req.headers.authorization;

    req["session_secret"] = {
      sale_key: bearerToken,
    };
    next();
  }
}
