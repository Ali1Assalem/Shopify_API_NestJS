import { Body, Controller, Post } from "@nestjs/common";
import { UserLoginDTO } from "./dto/user-login.dto";
import { AuthService } from "./auth.service";
import { UserRegisterDto } from "./dto/user-register.dto";


@Controller('auth')
export class AuthController{
    constructor(
        private readonly authService:AuthService
    ){}

    @Post('login')
    async login(@Body() userLLoginDto: UserLoginDTO){
        return this.authService.login(userLLoginDto)
    }

    @Post('register')
    async register(@Body() userRegisterDto:UserRegisterDto){
        return this.authService.register(userRegisterDto)
    }
}