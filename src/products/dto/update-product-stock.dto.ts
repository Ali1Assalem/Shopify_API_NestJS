import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateProductStockDto {

  @IsNumber()
  @IsNotEmpty()
  stock: number;
}
