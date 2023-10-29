import { ExecutionContext, ForbiddenException, createParamDecorator } from "@nestjs/common";
import { JWtPayload } from "../../auth/types";

export const GetCurrenAdminId = createParamDecorator (
    (
        _: undefined, context: ExecutionContext
    ): number => {
        const request = context.switchToHttp().getRequest();    
        
        const user = request.user as JWtPayload;
        console.log(request);
        
        
        if (!user) throw new ForbiddenException("Token notog'ri");
        
        return user.sub;
    }
);