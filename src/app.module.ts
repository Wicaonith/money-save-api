import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/api/auth/auth.module';
import { AppController } from 'src/app.controller';
import { ConfigService } from 'src/core/config/config.service';
import { AccountsModule } from './api/accounts/accounts.module';
import { BudgetsModule } from './api/budgets/budgets.module';
import { CategoriesModule } from './api/categories/categories.module';
import { PictogramsModule } from './api/pictograms/pictograms.module';
import { TransactionsModule } from './api/transactions/transactions.module';
import { ConfigModule } from './core/config/config.module';
import { MetiersModule } from './metiers/metiers.module';

@Module({
  imports: [
    AuthModule,
    AccountsModule,
    CategoriesModule,
    BudgetsModule,
    PictogramsModule,
    TransactionsModule,
    MetiersModule,
    ConfigModule,
    // MongoDB Connexion
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.getMongoConfig(),
    })
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
