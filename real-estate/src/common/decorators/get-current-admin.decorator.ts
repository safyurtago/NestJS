import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { JwtPayloadWithRefreshToken } from '../../auth/types';

export const GetCurrentAdmin = createParamDecorator(
    (
        data: keyof JwtPayloadWithRefreshToken | undefined,
        context: ExecutionContext
    ) => {
        const request = context.switchToHttp().getRequest();
        

        if(!data) return request.admin;
        return request.admin[data];
    }
)