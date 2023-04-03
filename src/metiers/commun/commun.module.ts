import { Module } from '@nestjs/common';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [UtilsModule],
  exports: [UtilsModule]
})
export class CommunModule { }
