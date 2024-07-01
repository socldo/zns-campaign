import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

/**
 * 
 */
export class BaseListResponseData<T> {


    @ApiProperty({
        example: '[]',
        description: 'danh sách ${T}.property ',
    })
    private list: T[];

    @ApiProperty({
        example: 20,
        description: 'giới hạn trên 1 trang ',
    })
    private limit: number;

    @ApiProperty({
        example: 1,
        description: 'tổng số record thu được ',
    })
    private total_record: number;

    constructor( list?: any, limit?: number, total_record?: number) {
        this.list = list ? list : [];
        this.limit = limit ? + limit : 20;
        this.total_record = total_record ? + total_record : 0
    }
    public getData(): Object {
        return this.list;
    }

    public setData(list: T[]): void {
        this.list = list;
    }
    
}