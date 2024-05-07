import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stores } from 'src/entity/stores.entity';
import { Users } from 'src/entity/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constant';

@Module({
  imports: [TypeOrmModule.forFeature([Stores, Users]),  JwtModule.register({ 
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1h' },
  })],
  controllers: [StoresController],
  providers: [StoresService]
})
export class StoresModule {}
