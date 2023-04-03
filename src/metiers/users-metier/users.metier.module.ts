import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersMetier } from 'src/metiers/users-metier/users.metier';
import { User, UserSchema } from 'src/models/schemas/users.schema';
import { CommunModule } from 'src/metiers/commun/commun.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CommunModule
  ],
  providers: [UsersMetier],
  exports: [UsersMetier]
})
export class UsersMetierModule { }
