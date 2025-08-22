import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateCartDto{
    @IsNotEmpty()
    @IsNumber()
    productId: number;
    
    @IsNotEmpty()
    @IsNumber()
    quantity: number; 
}