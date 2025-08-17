import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { UserRegisterDto } from "./dto/user-register.dto";
import * as bcrypt from 'bcryptjs';
import { UserLoginDTO } from "./dto/user-login.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) 
        private readonly userRepository : Repository<User>,
        private jwtService : JwtService
    ){}

    async login(userLoginDto:UserLoginDTO){
        const user = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where('user.email = email',{ email: userLoginDto.email })
        .getOne()

        if(!user){
            throw new UnauthorizedException('Bad Credentials');
        }else{
            if(await this.verifyPassword(userLoginDto.password,user.password)){
                const token = await this.jwtService.signAsync({
                    email:user.email,
                    id:user.id
                })
                const {password , ...safeUser} = user
                return {token , user:safeUser}
            }else {
                throw new UnauthorizedException('Bad Credentials');
            }
        }
    }

    async verifyPassword(password:string,hashedPassword:string){
        return await bcrypt.compare(password,hashedPassword)
    }

    async register(userRegisterDto : UserRegisterDto){
        const {email , password} = userRegisterDto
        const checkForUser = await this.userRepository.findOneBy({email})
        if(checkForUser){
            throw new BadRequestException(
                `Email is already taken, please choose another one`
            )
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const user = this.userRepository.create({
            ...userRegisterDto,
            password : hashedPassword
        })

        await this.userRepository.save(user)
        return user
    }
}