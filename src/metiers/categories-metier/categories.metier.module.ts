import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/models/schemas/category.schema';
import { CategoriesMetier } from './categories.metier';

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
  providers: [CategoriesMetier],
  exports: [CategoriesMetier]
})
export class CategoriesMetierModule { }
