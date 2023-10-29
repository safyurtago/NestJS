import { JWtPayload } from ".";

export type JwtPayloadWithRefreshToken = JWtPayload & { refreshToken: string };