import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { protobufPackage } from '../interfaces/zns-campaign';
dotenv.config();
export const grpcClientOptions: ClientOptions = {
    transport: Transport.GRPC,
    options: {
        url: `${process.env.CONFIG_GRPC_NESTJS_ZNS_CUSTOMER_HOST}:${process.env.CONFIG_GRPC_NESTJS_ZNS_CUSTOMER_PORT}`,
        package: [
            protobufPackage
        ],
        protoPath: [
            join(
                __dirname,
                "../protos/zns-campaign.proto"
            )
        ],
        loader: {
            keepCase: true,
        },
        channelOptions: {
            "grpc.default_deadline_ms": 2000,
            "grpc.initial_reconnect_backoff_ms": 2000,
            "grpc.service_config": JSON.stringify({
                methodConfig: [
                    {
                        name: [],
                        timeout: { seconds: 10, nanos: 0 },
                        retryPolicy: {
                            maxAttempts: 5,
                            initialBackoff: "0.1s",
                            maxBackoff: "30s",
                            backoffMultiplier: 3,
                            retryableStatusCodes: ["UNAVAILABLE"],
                        },
                    },
                ],
            }),
        },
        keepalive: { keepaliveTimeoutMs: 2000, keepaliveTimeMs: 100000 },
    },
};
