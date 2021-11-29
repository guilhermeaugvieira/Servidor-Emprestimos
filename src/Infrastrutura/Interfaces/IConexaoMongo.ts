interface IConexaoMongo{
  Conectar() : Promise<void>;

  Disconectar(): Promise<void>;
}

export { IConexaoMongo }