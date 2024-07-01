import { format } from 'date-fns';
import { RestaurantPcZns } from './zns-campaign.entity';
import { UtilsDate } from 'src/utils.common/utils.format-time.common/utils.format-time.common';

export class RestaurantPcZnsResponse {
    id: number;
    restaurant_id: number;
    restaurant_brand_id: number;
    name: string;
    template_id: string;
    template_data: {
        id: string;
        date: string;
        customer_name: string;
      };
    send_at: Date;
    running_status: number;
    message_recipient: number;
    created_at: string; 
    updated_at: string; 
    access_token: string;
    refresh_token: string;

    constructor(data: RestaurantPcZns) {
        this.id = data.id;
        this.restaurant_id = data.restaurant_id;
        this.restaurant_brand_id = data.restaurant_brand_id;
        this.name = data.name;
        this.template_id = data.template_id;
        this.template_data = JSON.parse(data.template_data);
        this.send_at = data.send_at;
        this.running_status = data.running_status;
        this.message_recipient = data.message_recipient;
        this.created_at = UtilsDate.formatDateTimeVNToStringWithSecond(data.created_at); 
        this.updated_at = UtilsDate.formatDateTimeVNToStringWithSecond(data.updated_at); 
    }

    static mapEntityToResponse(entity: RestaurantPcZns): RestaurantPcZnsResponse {
        return new RestaurantPcZnsResponse(entity);
    }

    static mapEntitiesToResponses(entities: RestaurantPcZns[]): RestaurantPcZnsResponse[] {
        return entities.map(entity => this.mapEntityToResponse(entity));
    }
}
