import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { MetiersModule } from 'src/metiers/metiers.module';

@Module({
  imports: [MetiersModule],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports:[AccountsService]
})
export class AccountsModule { }
