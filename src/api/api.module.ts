import { Module } from '@nestjs/common';
import { AuthModule } from 'src/api/auth/auth.module';
import { MetiersModule } from 'src/metiers/metiers.module';
import { AccountsModule } from './accounts/accounts.module';
import { CategoriesModule } from './categories/categories.module';
import { BudgetsModule } from './budgets/budgets.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
    imports: [
        AuthModule,
        MetiersModule,
        AccountsModule,
        CategoriesModule,
        BudgetsModule,
        TransactionsModule
    ],
    providers: [
        AuthModule,
        AccountsModule,
        CategoriesModule,
        BudgetsModule,
        TransactionsModule
    ],
    exports: [
        AuthModule,
        AccountsModule,
        CategoriesModule,
        BudgetsModule,
        TransactionsModule
    ]
})
export class ApiModule { }
