import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { APP_PORT } from "src/core/environments/envitoment";
import { BusinessExceptionFilter } from "src/core/exception/businnes-exception-filters";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new BusinessExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors({
    origin: true,
  });

  await app.listen(APP_PORT);
  console.log(`APP is running on PORT: ${APP_PORT} 🚀`);
}
bootstrap();