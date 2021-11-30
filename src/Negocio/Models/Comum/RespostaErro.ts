class RespostaErro{
  sucesso: Boolean;
  erro: String;

  constructor(errosObtido: String){
    this.sucesso = false;
    this.erro = errosObtido;
  }
}

export { RespostaErro };