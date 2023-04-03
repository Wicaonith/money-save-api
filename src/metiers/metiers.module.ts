import { Module } from '@nestjs/common';
import { CommunModule } from 'src/metiers/commun/commun.module';
import { AccountsMetierModule } from './accounts-metier/accounts.metier.module';
import { BudgetsMetierModule } from './budgets-metier/budgets.metier.module';
import { CategoriesMetierModule } from './categories-metier/categories.metier.module';
import { CustomersMetierModule } from './customers-metier/customers.metier.module';
import { PictogramsMetierModule } from './pictograms-metier/pictograms.metier.module';
import { TransactionsMetierModule } from './transactions-metier/transactions.metier.module';
import { UsersMetierModule } from './users-metier/users.metier.module';

@Module({
  imports: [
    UsersMetierModule,
    TransactionsMetierModule,
    CustomersMetierModule,
    CommunModule,
    CategoriesMetierModule,
    BudgetsMetierModule,
    AccountsMetierModule,
    PictogramsMetierModule
  ],
  exports: [
    UsersMetierModule,
    TransactionsMetierModule,
    CustomersMetierModule,
    CommunModule,
    CategoriesMetierModule,
    BudgetsMetierModule,
    AccountsMetierModule,
    PictogramsMetierModule
  ],
})
export class MetiersModule { }
