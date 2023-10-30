import { ExecutionContext, ForbiddenException, createParamDecorator } from "@nestjs/common";
import { JwtPayload } from "../../admin/types";

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    
    const user = request.user as JwtPayload;
    console.log(user);
    
    if (!user) throw new ForbiddenException('Token not valid');
    return user.sub;
  },
);