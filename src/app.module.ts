import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath : '.env'
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        entities: [Product , Category , User , Cart],
        synchronize: true,
        logging: true,
      })
    }),
  
    AuthModule ,UserModule , ProductsModule , CategoryModule, ReviewsModule],
})


export class AppModule {}
