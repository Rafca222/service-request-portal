import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './lib/database/prisma.module';
import { ServiceRequestsModule } from './service-requests/service-requests.module';

@Module({
  imports: [PrismaModule, ServiceRequestsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}