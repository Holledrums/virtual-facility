import { Module } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { BuildingsController } from './buildings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from './entities/building.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Building]),
    ClientsModule.register([
      {
        name: 'WORKFLOWS_SERVICE',
        transport: Transport.RMQ, // 👈
        options: {
          urls: [
            process.env.RABBITMQ_URL ?? 'amqp://guest:guest@rabbitmq:5672',
          ], // 👈
          queue: 'workflows_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [BuildingsController],
  providers: [BuildingsService],
})
export class BuildingsModule {}
