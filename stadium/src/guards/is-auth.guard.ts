import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";


export class IsAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        

        return true
    }
}