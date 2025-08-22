import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository, UpdateDateColumn } from "typeorm";
import { CartItem } from "./entities/cart-item.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/products/entities/product.entity";
import { Cart } from "src/cart/entities/cart.entity";
import { CreateCartItemDto } from "./dto/create-cart-item.dto.ts";
import { RemoveCartItemDto } from "./dto/remove-carrt-item.dto";
import { UpdateCartItemDto } from "./dto/update-cart-item.dto.ts";

@Injectable()
export class CartItemsService{
    constructor(
        @InjectRepository(CartItem)
        private readonly cartItemRepository:Repository<CartItem>,
        @InjectRepository(Product)
        private readonly productRpository:Repository<Product>,
        @InjectRepository(Cart)
        private readonly cartRpository:Repository<Cart>,
    ){}

    async addCartItem(createCartItemDto:CreateCartItemDto){
        const product = await this.productRpository.findOne({
            where : {id:createCartItemDto.productId}
        })

        if(!product){
            throw new BadRequestException('product not found')
        }

        const existingCartItem = await this.cartItemRepository.findOne({
            where : {
                cart: { id: createCartItemDto.cartId },
                product: { id: createCartItemDto.productId },
            }
        })

        if(existingCartItem){
            throw new BadRequestException('Product Already Added in Cart');
        }else{
            const cart = await this.cartRpository.findOne({
                where: { id: createCartItemDto.cartId },
            });
            if (!cart) {
                 throw new BadRequestException('Cart not found');
            }
            const cartItem = this.cartItemRepository.create({
                cart: cart,
                product: product,
            });
                 
            return await this.cartItemRepository.save(cartItem);

        }
    }

    async removeCartItem(removeCartItemDto:RemoveCartItemDto){
        const {cartId , productId} = removeCartItemDto
        // 1. Find the cart item using cartId and productId
        const cartItem = await this.cartItemRepository.findOne({
            where : {
                cart : {id: cartId},
                product : {id: productId}
            }
        })

        if(!cartItem){
            throw new BadRequestException('Cart item not found');
        }

        // 2. Remove the cart item if it exists
        await this.cartItemRepository.remove(cartItem)

        // 3. Check if the cart has any remaining items
        const remainingItems = await this.cartItemRepository.find({
            where : { cart : {id : cartId}}
        })

        if (remainingItems.length === 0) {
            // 4. If the cart is empty, delete the cart itself
            await this.cartRpository.delete(cartId);
            return {
                 message: 'Cart item removed, and cart deleted because it is now empty',
            };
        }

        return { message: 'Cart item removed successfully' };
    }
    
    async updateCartItemQuantity(updateCartItemDto:UpdateCartItemDto){
        const {cartId , productId , quantity} = updateCartItemDto

        // Find the cart item based on the cartId and productId
        const cartItem = await this.cartItemRepository.findOne({
            where :{
                cart : { id : cartId},
                product  :{ id : productId}
            }
        })

        if(!cartItem){
            throw new NotFoundException('Product not found in the cart.');
        }

        // Update the quantity of the cart item 
        cartItem.quantity = quantity

        // Save the updated cart item
        await this.cartItemRepository.save(cartItem);

        // Return the updated cart item
        return cartItem
    }

    async cleanCartItems(cartId: number): Promise<void> {
        // Step 1: Remove all cart items for the given cartId
        await this.cartItemRepository.delete({ cart: { id: cartId } });
    }
}