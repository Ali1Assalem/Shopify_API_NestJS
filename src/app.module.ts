import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { Category } from './category/entities/category.entity';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { Cart } from './cart/entities/cart.entity';
import { CartModule } from './cart/cart.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { CartItem } from './cart-items/entities/cart-item.entity';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './auth/roles/user-roles';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath : '.env'
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory:
       (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        entities: [Product , Category , User , Cart , CartItem],
        synchronize: true,
        logging: true,
      })
    }),
  
    AuthModule ,UserModule , ProductsModule , CategoryModule, CartModule , CartItemsModule ,ReviewsModule, AccessControlModule.forRoles(roles)],
})


export class AppModule {}
