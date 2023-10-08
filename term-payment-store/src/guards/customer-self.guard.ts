import { Observable } from "rxjs";
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";

@Injectable()
export class CustomerSelfGuard implements CanActivate {
canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    
        if(String(req.customer.id) !== req.params.id) {
            throw new ForbiddenException({
                message: 'Ruxsat etilmagan foydalanuvchi'
            })
        }
        return true
    }
}