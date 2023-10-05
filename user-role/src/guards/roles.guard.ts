import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles-auth.decorators';


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector
    ){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        if(!requiredRoles) return true;

        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;    
        if(!authHeader) {
            throw new UnauthorizedException({
                message: 'Foydalanuvchi avtorizatiyadan otmagan'
            })
        }
        const bearer = authHeader.split(' ')[0]
        const token = authHeader.split(' ')[1]
        if( bearer !== 'Bearer' || !token){
            throw new UnauthorizedException({
                message: 'Foydalanuvchi avtorizatiyadan otmagan'
            })
        }
        let user: any
        try {
            user = this.jwtService.verify(token);
            console.log(user);
        } catch (error) {
            throw new UnauthorizedException({
                message: 'Foydalanuvchi avtorizatiyadan otmagan'
            })
        }
        req.user = user;

        const permission = user.roles.some((role: any) => requiredRoles.includes(role.value))

        if(!permission) {
            throw new UnauthorizedException({
                message: 'Ruxsat yoq'
            })
        }

        return true;
    }
    
}