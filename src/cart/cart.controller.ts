import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CurrentUser } from "src/auth/decorators/user.decorator";
import { User } from "src/user/entities/user.entity";
import { AuthGuard } from "@nestjs/passport";
import { ACGuard, UseRoles } from "nest-access-control";
import { CreateCartDto } from "./dto/cretae-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { RemoveCartDto } from "./dto/remove-cart.dto";

@Controller('cart')
export class CartController {
    constructor(private readonly cartService:CartService){}

    @Get()
    @UseGuards(AuthGuard('jwt'),ACGuard)
    @UseRoles({
        possession:'own',
        action:'read',
        resource:'cart'
    })
    async getUserCart(@CurrentUser() user:User){
        return await this.cartService.getUserCart(user)
    }

    @Post('add')
    @UseGuards(AuthGuard('jwt'),ACGuard)
    @UseRoles({
        possession:'own',
        action:'create',
        resource:'cart'
    })
    async addToCart(
        @Body() createCartDto:CreateCartDto ,
        @CurrentUser() user:User
    ){
        return await this.cartService.addToCart(createCartDto,user)
    }

    @Patch('update')
    @UseGuards(AuthGuard('jwt'), ACGuard)
    @UseRoles({
      possession: 'own',
      action: 'update', 
      resource: 'cart',
    })
    async updateItemQuantityFromCart(
        @Body() updateCartDto: UpdateCartDto,
        @CurrentUser() user: User
    ){
       return this.cartService.updateCart(updateCartDto, user)
    }  


    @Delete('remove')
    @UseGuards(AuthGuard('jwt'), ACGuard)
    @UseRoles({
        possession: 'own',
        action: 'delete',
        resource: 'cart',
    })
    async removeFromCart(
        @Body() removeCartDto: RemoveCartDto,
        @CurrentUser() user: User
    ){
        return this.cartService.removeFromCart(removeCartDto, user)
    }
    
}