import { Connection, connect, connection, disconnect, Error } from "mongoose";

class MongoConnection{
  database: Connection = null;

  async connectDatabase() : Promise<void> {
    if (this.database) return;

    try {
      await connect(`mongodb://${process.env.DATABASE_ADDRESS}:${process.env.MONGO_PORT}/${process.env.DATABASE_NAME}`);

      this.database = connection;
    } catch(error) {
      console.log(error);
    }
    
  }

  async disconnectDatabase(): Promise<void> {
    if (!this.database) return;

    try {
      await disconnect();
      
      this.database = null;
    } catch(error) {
      console.log(error);
    }

  }
}

export { MongoConnection };

