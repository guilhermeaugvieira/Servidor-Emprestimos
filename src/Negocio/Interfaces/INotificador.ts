interface INotificador{
  AdicionarNotificacao(message: String) : void;
  ObterNotificacoes() : String[];
  TemNotificacao() : Boolean;
}

export { INotificador };