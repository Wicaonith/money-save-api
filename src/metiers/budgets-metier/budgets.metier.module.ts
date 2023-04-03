import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BudgetsMetier } from './budgets.metier';
import { Budget, BudgetSchema } from '../../models/schemas/budgets.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Budget.name, schema: BudgetSchema }])],
  providers: [BudgetsMetier],
  exports: [BudgetsMetier]
})
export class BudgetsMetierModule { }
