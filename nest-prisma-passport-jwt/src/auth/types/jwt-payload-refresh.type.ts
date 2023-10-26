import { JwtPayload } from ".";


export type JwtPayloadWithRefreshToken = JwtPayload & {refreshToke: string};