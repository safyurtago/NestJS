import { Request } from "express";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { JWtPayload, JwtPayloadWithRefreshToken } from "../types";

@Injectable()
export class RefreshTokenFromBearerStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.REFRESH_TOKEN_KEY,
      passReqToCallback: true,
    });
  };
  validate(req: Request, payload: JWtPayload): JwtPayloadWithRefreshToken {
    const authHeader = req.headers.authorization;
    const refreshToken = authHeader.split(' ')[1];
    if (!refreshToken) throw new ForbiddenException('Refresh token is not valid');
    return {
      ... payload,
      refreshToken
    };
  };
};