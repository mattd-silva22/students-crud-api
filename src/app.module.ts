import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { StudentsController } from "./students/students.controller";
import { StudentsService } from "./students/students.service";
import { StudentsRepository } from "./students/students.repository";
import { ConfigModule } from "@nestjs/config";
import { PostgresConnector } from "./shared/database/postgres/postgressConnector.db";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna o módulo de configuração global
    }),
  ],
  controllers: [AppController, StudentsController],
  providers: [StudentsService, StudentsRepository, PostgresConnector],

  exports: [StudentsService, StudentsRepository],
})
export class AppModule {}
