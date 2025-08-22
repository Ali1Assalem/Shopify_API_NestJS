import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateCartItemDto {
  @IsNotEmpty()
  @IsNumber()
  cartId: number;

  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}