import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MetiersModule } from 'src/metiers/metiers.module';
import { ApiModule } from '../api.module';
import { BudgetsModule } from '../budgets/budgets.module';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
  imports: [
    MetiersModule,
    BudgetsModule,
    AccountsModule
  ],
  controllers: [
    TransactionsController
  ],
  providers: [
    TransactionsService
  ]
})
export class TransactionsModule { }
