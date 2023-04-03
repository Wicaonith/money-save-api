import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from 'src/models/schemas/transactions.schema';
import { TransactionsMetier } from './transactions.metier';

@Module({
  imports: [MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }])],
  providers: [TransactionsMetier],
  exports: [TransactionsMetier]
})
export class TransactionsMetierModule { }
