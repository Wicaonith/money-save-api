import { Module } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { BudgetsController } from './budgets.controller';
import { MetiersModule } from 'src/metiers/metiers.module';

@Module({
  imports: [MetiersModule],
  controllers: [BudgetsController],
  providers: [BudgetsService],
  exports: [BudgetsService]
})
export class BudgetsModule { }
