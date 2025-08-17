import { UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";


export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(payload: any, req: Request) {
    if (!payload) throw new UnauthorizedException();

    const user = await this.userRepository.findOneBy({ email: payload.email });
    if (!user) throw new UnauthorizedException();
    
    (req as any).user = user;
    return user;
  }
}
