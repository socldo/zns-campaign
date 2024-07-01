import { ApiProperty } from "@nestjs/swagger";

export class SwaggerResponse {
    @ApiProperty()
    status: number;
  
    @ApiProperty()
    message: string;
  
    @ApiProperty()
    data: any;
  }