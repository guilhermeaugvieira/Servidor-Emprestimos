import { Connection, connect, connection, disconnect} from "mongoose";

class ConexaoMongo{
  baseDeDados: Connection = null;

  async conectar() : Promise<void> {
    if (this.baseDeDados) return;

    try {
      await connect(`mongodb://${process.env.DATABASE_ADDRESS}:${process.env.MONGO_PORT}/${process.env.DATABASE_NAME}`);

      this.baseDeDados = connection;
    } catch(error) {
      console.log(error);
    }    
  }

  async disconectar(): Promise<void> {
    if (!this.baseDeDados) return;

    try {
      await disconnect();
      
      this.baseDeDados = null;
    } catch(error) {
      console.log(error);
    }
  }
}

export { ConexaoMongo };

