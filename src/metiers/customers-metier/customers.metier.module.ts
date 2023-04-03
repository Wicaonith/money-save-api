import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from 'src/models/schemas/customers.schema';
import { CustomersMetier } from './customers.metier';

@Module({
  imports: [MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }])],
  providers: [CustomersMetier],
  exports: [CustomersMetier]
})
export class CustomersMetierModule { }
