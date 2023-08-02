import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Environments } from 'src/core/Environments';
import { documents } from 'src/database/models';
import { ProductController } from 'src/users/product/product.controller';
import { ProductService } from 'src/users/product/product.service';
import { repositories } from 'src/database/repositories';

@Module({
  imports: [
    MongooseModule.forRoot(Environments.DB_URL),
    MongooseModule.forFeature(documents),
  ],
  controllers: [AppController, ProductController],
  providers: [AppService, ProductService, ...repositories],
})
export class AppModule {}
