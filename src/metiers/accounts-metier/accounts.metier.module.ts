import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsMetier } from './accounts.metier';
import { Account, AccountSchema } from '../../models/schemas/accounts.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }])],
  providers: [AccountsMetier],
  exports: [AccountsMetier]
})
export class AccountsMetierModule { }
