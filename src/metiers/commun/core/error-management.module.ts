import { Module } from '@nestjs/common';
import { ErrorManagementService } from './error-management.service';

@Module({
  exports: [ErrorManagementService],
  providers: [ErrorManagementService]
})
export class UtilsModule { }
