import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWtPayload } from "../types";

@Injectable()
export class AccessTokenSrategy extends PassportStrategy(
    Strategy,
    'access-jwt'
) {
    constructor () {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.ACCESS_TOKEN_KEY
        });
    }
    validate(payload: JWtPayload): JWtPayload {
        return payload;   
    }
}