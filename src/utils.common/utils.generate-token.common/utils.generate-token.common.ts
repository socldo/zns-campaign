
export class GenerateToken {
     username: string;
     type_user: number;
     user_id: number;
     password: string

    constructor(userId: number, username: string,password:string, type: number) {
        this.user_id = userId;
        this.username = username;
        this.type_user = type;
        this.password= password
    }
}