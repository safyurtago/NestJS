import { JwtService } from "@nestjs/jwt";
import { Admin } from "../admin/models/admin.model";

const {env} = process;

export class getTokens {
    constructor (
        private readonly jwtService: JwtService
    ) {};


    // get tokens admin method
    async getAdminTokens (admin: Admin) {
        const jwtPayload = {
            id: admin.id,
            status: admin.status,
            role: admin.role,
        };
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: env.ACCESS_TOKEN_KEY,
                expiresIn: env.ACCESS_TOKEN_TIME,
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: env.REFRESH_TOKEN_KEY,
                expiresIn: env.REFRESH_TOKEN_TIME,
            }),
        ]);
        return {
            access_token,
            refresh_token,
        };
    };


};