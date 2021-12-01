interface IServicoEmprestimo {
  
  SolicitarEmprestimo (idUsuario: string, montante: number, numeroPrestacoes: number) : Promise<any>;

  ObterTodosEmprestimos () : Promise<any>;

  ObterEmprestimoPorId (idEmprestimo: string) : Promise<any>;

  ObterEmprestimosPorUsuario (idUsuario: string) : Promise<any>;

  AtualizarStatusEmprestimo (idEmprestimo: string, statusEmprestimo : string) : Promise<any>;
}

export { IServicoEmprestimo }