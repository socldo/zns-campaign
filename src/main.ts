import {
  HttpException,
  HttpStatus,
  LogLevel,
  ValidationError,
  ValidationPipe,
  VersioningType,
} from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { join } from "path";
import { AppModule } from "./app.module";
import { ExceptionResponseDetail } from "./utils.common/utils.exception.common/utils.exception.common";

const httpsOptions = {
  // key: fs.readFileSync("./key.pem"),
  // cert: fs.readFileSync("./cert.pem"),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: process.env.CONFIG_LOGGER_LEVEL.split(",").filter(
      (level: string): level is LogLevel => {
        return ["log", "error", "warn", "debug", "verbose"].includes(
          level as LogLevel
        );
      }
    ),
  });

  //Thêm config retry GRPC client 3 lần
  const retryOptions = {
    max_retries: 3, // Set the maximum number of retries
    initial_backoff_ms: 1000, // Initial backoff time in milliseconds
    max_backoff_ms: 5000, // Maximum backoff time in milliseconds
    backoff_multiplier: 1.5, // Backoff multiplier
    retryable_status_codes: [14], // Status codes to retry
  };

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${process.env.GRPC_SERVICE_PORT}`,
      package: [
        "vn.techres.microservice.grpc.nestjs_zns_campagin"
      ],
      protoPath: [
        join(
          __dirname,
          "/grpc/protos/zns-campaign.proto"
        )
      ],
      keepalive: {
        keepaliveTimeMs: 60000,
        keepaliveTimeoutMs: 20000,
        keepalivePermitWithoutCalls: 0,
        ...(retryOptions && { retry: retryOptions }),
      },
      loader: {
        keepCase: true,
      },
    },
  });

  app.startAllMicroservices();
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // prefix action
  app.setGlobalPrefix("/api");

  // bắt lỗi toàn cục
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        throw new HttpException(
          new ExceptionResponseDetail(
            HttpStatus.BAD_REQUEST,
            Object.values(validationErrors[0].constraints)[0]
          ),
          HttpStatus.OK
        );
      },
    })
  );



  const config = new DocumentBuilder()
    .setTitle("HỆ THỐNG ZALO NOTIFICATION SERVICE CAMPAIGN")
    .setDescription(
      "Thông báo bằng tài khoản zalo oa"
    )
    .setVersion("version 1.0.0")
    .setBasePath("/doc")
    .addBearerAuth({
      description: `Truyền Basic_secret phù hợp`,
      name: "Authorization",
      type: "http",
      in: "Header",
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("doc", app, document);
    

  app.enableCors();
  await app.listen(process.env.SERVICE_PORT, "0.0.0.0");
  let moment = require('moment-timezone');


  console.log('Ho Chi Minh TimeZone:',moment().tz("Asia/Ho_Chi_Minh").format('DD-MM-YYYY HH:MM:SS'));

  console.log(`
    ==============================ZALO NOTIFICATION SERVICE=============================

    ▒███████▒ ███▄    █   ██████ 
    ▒ ▒ ▒ ▄▀░ ██ ▀█   █ ▒██    ▒ 
    ░ ▒ ▄▀▒░ ▓██  ▀█ ██▒░ ▓██▄   
      ▄▀▒   ░▓██▒  ▐▌██▒  ▒   ██▒
    ▒███████▒▒██░   ▓██░▒██████▒▒
    ░▒▒ ▓░▒░▒░ ▒░   ▒ ▒ ▒ ▒▓▒ ▒ ░
    ░░▒ ▒ ░ ▒░ ░░   ░ ▒░░ ░▒  ░ ░
    ░ ░ ░ ░ ░   ░   ░ ░ ░  ░  ░  
      ░ ░             ░       ░  
    ░                                                                                                                                                                                                                                 
                  
    SERVICE_PORT:${process.env.SERVICE_PORT}, 
    GRPC_SERVICE_PORT :${process.env.GRPC_SERVICE_PORT},

  ==============================ZALO NOTIFICATION SERVICE==============================`);
  console.log(
    `Application is running on: ${await app.getUrl()}`
  );
}
bootstrap();
