import { Connection, connect, connection, disconnect} from "mongoose";
import { Lifecycle, scoped } from "tsyringe";
import { IConexaoMongo } from "../Interfaces/IConexaoMongo";

class ConexaoMongo implements IConexaoMongo{
  baseDeDados: Connection = null;

  async Conectar() : Promise<void> {
    if (this.baseDeDados) return;

    try {
      await connect(`mongodb://${process.env.DATABASE_ADDRESS}:${process.env.MONGO_PORT}/${process.env.DATABASE_NAME}`);

      this.baseDeDados = connection;
    } catch(error) {
      console.log(error);
    }    
  }

  async Disconectar(): Promise<void> {
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

