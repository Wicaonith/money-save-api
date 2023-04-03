import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthFactory } from 'src/api/auth/auth-factory';
import { AuthController } from 'src/api/auth/auth.controller';
import { AuthService } from 'src/api/auth/auth.service';
import { jwtConstants } from 'src/core/constants/constants';
import { JwtStrategy } from 'src/core/strategies/jwt.strategy';
import { LocalStrategy } from 'src/core/strategies/local.strategy';
import { MetiersModule } from 'src/metiers/metiers.module';

@Module({
  imports: [
    MetiersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthFactory, AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]

})
export class AuthModule { }
