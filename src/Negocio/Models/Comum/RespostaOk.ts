class RespostaOk<TContent>{
  sucesso: boolean;
  dados: TContent;

  constructor(content: TContent){
    this.sucesso = true;
    this.dados = content;
  }
}

export { RespostaOk };