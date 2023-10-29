import { AuthGuard } from "@nestjs/passport";


export class RefreshTokenGuard extends AuthGuard('refresfh-jwt') {
  constructor() {
    super();
  }
}