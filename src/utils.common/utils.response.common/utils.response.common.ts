import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class ResponseData {
  @ApiProperty({
    example: "200",
    description: "HTTP response status codes theo quy chuẩn HTTP/1.1",
  })
  private status: HttpStatus;

  @ApiProperty({
    example: "Success",
    description: "Câu thông báo API trả về cho client",
  })
  private message: string;

  @ApiProperty({
    example: "[{'name': 'David', 'age': 26}]",
    description: "Dữ liệu server trả về",
  })
  private data: Object;

  constructor(status: number = null, message: string = null, data?: Object) {
    this.status = status ? +status : +HttpStatus.OK;
    this.message = message ? message : "SUCCESS";
    this.data = data ? data : null;
  }

  public getStatus(): HttpStatus {
    return this.status;
  }

  public setStatus(status: HttpStatus): void {
    this.status = status;
  }


  public setStatusGrpc(status: number): void {
    this.status = status;
  }


  public getMessage(): string {
    return this.message;
  }

  public setMessage(status: HttpStatus, message: string): void {
    if (message) {
      this.message = message;
    } else {
      switch (status) {
        case HttpStatus.OK:
          this.message = "SUCCESS";
          break;
        case HttpStatus.BAD_REQUEST:
          this.message = "Dữ liệu không hợp lệ";
          break;
        default:
          this.message = "SUCCESS";
          break;
      }
    }
  }


  public setMessageGrpc(message: string): void {
    this.message = message;
  }

  public getData(): Object {
    return this.data;
  }

  public setData(data: Object): void {
    this.data = data;
  }
}
