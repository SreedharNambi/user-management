import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesController } from './employees/employees.controller';
import { EmployeesService } from './employees/employees.service';
import { CandidatesService } from './candidates/candidates.service';
import { CandidatesController } from './candidates/candidates.controller';
import { PostgresService } from './database/postgres.service';
import { ConfigModule } from '@nestjs/config';
import postgresConfig from './database/postgres.config';

@Module({
  imports: [ConfigModule.forRoot({
    load: [postgresConfig ]
    })],
  controllers: [AppController, EmployeesController, CandidatesController],
  providers: [AppService, EmployeesService, CandidatesService,PostgresService],
})
export class AppModule {}
