interface INotificador{
  AdicionarNotificacao(message: String) : void;
  ObterNotificacoes() : String[];
}

export { INotificador };