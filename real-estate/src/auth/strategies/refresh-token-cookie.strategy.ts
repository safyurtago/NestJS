import { Request } from "express";
import { PassportStrategy } from "@nestjs/passport";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtFromRequestFunction, Strategy } from "passport-jwt";
import { JWtPayload, JwtPayloadWithRefreshToken } from "../types";

export const cookieExtractor: JwtFromRequestFunction= (req: Request) => {
    if (req && req.cookies) return req.cookies['refresh_token']

    return null;
}

@Injectable()
export class RefreshTokenFromCookieSrategy extends PassportStrategy(
    Strategy,
    'refresh-jwt'
) {
    constructor() {
        super({
            jwtFromRequest: cookieExtractor,
            secretOrKey: process.env.REFRESH_TOKEN_KEY,
            passReqToCallback: true,
        });
    }
    validate(req: Request, payload: JWtPayload): JwtPayloadWithRefreshToken {
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) throw new ForbiddenException('Refresh token is not valid');
        return {
          ... payload,
          refreshToken
        };
      };
}