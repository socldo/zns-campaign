export class ConnectDatabaseMongo {
    constructor() { }

    public connectMongo(): string {
        let result: string = `${process.env.db_connection}://${process.env.db_username}:${encodeURIComponent(process.env.db_password)}@${process.env.db_host}:${process.env.db_port}/${process.env.db_name}`;
        return result;
    }
}