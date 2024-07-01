import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import {
  isNotEmpty,
  isString,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";
import { ExceptionResponseDetail } from "../utils.exception.common/utils.exception.common";

/**
 * Công thức của get session:
 *
 * API sẽ trả về 5 cột: cột_1, cột_2, cột_3, cột_4, cột_5
 *
 * Giao diện sẽ phải rap các cột này theo công thức sau và gửi vào header bằng tham số Authorization=Basic session_secret
 *
 *  Công thức: Basic cột_5 + "." + Base64(cột_3) + "." + cột_1 + "." + Base64(cột_4) + "." + cột_1
 *
 *  split(.) để lấy ra cột Base64(cột_3) và Base64(cột_4)
 *  Endcode Base64(cột_3) và Base64(cột_4)
 *
 *  Dùng split("*") để lấy giá vị ở vị trí thứ 1.
 *
 *  Sau đó so sánh 2 giá trị này lại phải bằng số năm hiện tại, số ngày hiện tại
 */
export const IsCheckSaleKey = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = await ctx.switchToHttp().getRequest();

    let saleKey = request["session_secret"]["sale_key"];

    if (!saleKey || Number(saleKey.split(".").length) !== 5) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          "session_secret không hợp lệ!"
        ),
        HttpStatus.OK
      );
    }

    if (saleKey.split(" ")[0] !== "Basic") {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          "Vui lòng truyền prefix Basic trong key Authorization của header"
        ),
        HttpStatus.OK
      );
    }

    let key_3 = Buffer.from(saleKey.split(".")[1], "base64").toString("ascii");
    let key_4 = Buffer.from(saleKey.split(".")[3], "base64").toString("ascii");

    let day_key_3 = Number(key_3.split("*")[1]);
    let year_key_4 = Number(key_4.split("*")[1]);

    if (
      day_key_3 !== new Date().getDate() ||
      year_key_4 !== new Date().getFullYear()
    ) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.UNAUTHORIZED,
          "session_secret không hợp lệ!"
        ),
        HttpStatus.OK
      );
    }

    return true;
  }
);

export function IsInRestaurantBrandBusinessTypes(
  validationOptions?: ValidationOptions
) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: "IsInRestaurantBrandBusinessTypes",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: (value: any): boolean =>
          value.length !== 0 &&
          value.filter((y) =>
            [
              9, 12, 15, 18, 21, 24, 65, 67, 68, 71, 73, 76, 77, 79, 82, 85, 88,
              89, 92, 93,
            ].includes(Number(y))
          ).length == value.length,

        defaultMessage: (validationArguments?: ValidationArguments): string => {
          throw new HttpException(
            new ExceptionResponseDetail(
              HttpStatus.BAD_REQUEST,
              `${validationArguments.property}: [${validationArguments.value}] bạn truyền vào phải thuộc các giá trị sau: [9, 12, 15, 18, 21, 24, 65, 67, 68, 71, 73, 76, 77, 79, 82, 85, 88, 89, 92]`
            ),
            HttpStatus.OK
          );
        },
      },
    });
  };
}

export const GetUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = await ctx.switchToHttp().getRequest();

    if (!request.user) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.UNAUTHORIZED,
          "Token không hợp lệ!"
        ),
        HttpStatus.OK
      );
    }
    return request.user;
  }
);

export function IsNotEmptyString(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: "isNotEmptyString",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: (value: any): boolean =>
          isString(value) && isNotEmpty(value.trim()),
        defaultMessage: (validationArguments?: ValidationArguments): string => {
          throw new HttpException(
            new ExceptionResponseDetail(
              HttpStatus.BAD_REQUEST,
              `[${validationArguments.property}] không được để trống `
            ),
            HttpStatus.OK
          );
        },
      },
    });
  };
}

export function IsNotNull(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: "isNotNull",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: (value: any): boolean => value != null,
        defaultMessage: (validationArguments?: ValidationArguments): string => {
          throw new HttpException(
            new ExceptionResponseDetail(
              HttpStatus.BAD_REQUEST,
              `[${validationArguments.property}] không được để null `
            ),
            HttpStatus.OK
          );
        },
      },
    });
  };
}

export function IsNotEmpty(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: "isNotEmpty",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: (value: any): boolean =>
          typeof value === "string" && value.trim().length > 0,
        defaultMessage: (validationArguments?: ValidationArguments): string => {
          throw new HttpException(
            new ExceptionResponseDetail(
              HttpStatus.BAD_REQUEST,
              `[${validationArguments.property}] không được để trống `
            ),
            HttpStatus.OK
          );
        },
      },
    });
  };
}

export function IsInt(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: "isInt",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: (value: any): boolean =>
          !parseInt(value) || !isNaN(value) || !value,
        defaultMessage: (validationArguments?: ValidationArguments): string => {
          throw new HttpException(
            new ExceptionResponseDetail(
              HttpStatus.BAD_REQUEST,
              `[${validationArguments.property}] phải là kiêu số nguyên!`
            ),
            HttpStatus.OK
          );
        },
      },
    });
  };
}

export function MaxLength20(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: "maxLength20",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: (value: any): boolean => !(value.length > 20) || !value,
        defaultMessage: (validationArguments?: ValidationArguments): string => {
          throw new HttpException(
            new ExceptionResponseDetail(
              HttpStatus.BAD_REQUEST,
              `[${validationArguments.property}] không được nhập quá 20 ký tự ${propertyName}!`
            ),
            HttpStatus.OK
          );
        },
      },
    });
  };
}

export function IsEmptyArray(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: "isNotArray",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: (value: any): boolean => !(value.length == 0),
        defaultMessage: (validationArguments?: ValidationArguments): string => {
          throw new HttpException(
            new ExceptionResponseDetail(
              HttpStatus.BAD_REQUEST,
              `[${validationArguments.property}] phải là mãng[] có giá trị!`
            ),
            HttpStatus.OK
          );
        },
      },
    });
  };
}


export function IsDateFormat(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsDateFormat',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // Validate dd/mm/yyyy HH:mm:ss format
          const regex = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/;
          return typeof value === 'string' && regex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be in the format dd/mm/yyyy HH:mm:ss`;
        },
      },
    });
  };
}
