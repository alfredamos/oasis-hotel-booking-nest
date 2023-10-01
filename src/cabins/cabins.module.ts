import { Module } from '@nestjs/common';
import { CabinsService } from './cabins.service';
import { CabinsController } from './cabins.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CabinsController],
  providers: [CabinsService, PrismaService],
})
export class CabinsModule {}
