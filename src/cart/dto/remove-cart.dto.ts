import { IsNotEmpty, IsNumber } from "class-validator";

export class RemoveCartDto {

  @IsNotEmpty()
  @IsNumber()
  productId: number;
  
}
