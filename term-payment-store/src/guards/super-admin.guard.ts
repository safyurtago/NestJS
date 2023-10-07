import { CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from "@nestjs/common";


export class SuperAdminGuard implements CanActivate {
    async canActivate(context: ExecutionContext){
        const req = context.switchToHttp().getRequest();
        const admin = req.admin;
        
        if (admin['role'] != 'SUPERADMIN') {
            throw new ForbiddenException('Permission denied')
        }   
        return true
    }
}