import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Admin } from "../admin/models/admin.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        // @InjectModel(Admin) private readonly adminRepository: typeof Admin, // MUST CHECK THIS
        ) {}
    async canActivate(context: ExecutionContext){
        const req = context.switchToHttp().getRequest();
        
        const authHeader = req.headers.authorization;
        if(!authHeader) throw new UnauthorizedException('Admin Unauthorized');

        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];
        if(bearer != 'Bearer' || !token) throw new UnauthorizedException('Admin Unauthorized');
        
        try {
            
            const admin: Partial<Admin> = await this.jwtService.verify(token, {
                secret: process.env.ACCESS_TOKEN_KEY
            });

            // const findAdmin = await this.adminRepository.findByPk(admin.id)
            // if (!findAdmin) throw new UnauthorizedException('Admin Not Found');   // MUST CHECK THIS
            

            if(!admin) throw new UnauthorizedException('Invalid token provided');

            if(!admin.status) throw new BadRequestException('Admin is not active');

            req.admin = admin;

            return true;
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    } 
}