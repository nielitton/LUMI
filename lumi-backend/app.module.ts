import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { ApiModule } from 'src/api/api.module';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ApiModule,
    DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
