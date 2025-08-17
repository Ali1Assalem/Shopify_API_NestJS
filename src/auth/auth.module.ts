import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports : [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory:(configService:ConfigService) =>({
                secret : configService.get<string>('JWT_SECRET'),
                signOptions:{
                    algorithm : 'HS512',
                    expiresIn : '30d'
                }
            })
        }),
        PassportModule.register({
            defaultStrategy : 'jwt'
        })
    ],
    controllers : [AuthController],
    providers : [AuthService],
})
export class AuthModule {} 