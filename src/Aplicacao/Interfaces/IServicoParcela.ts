interface IServicoParcela{
  RegistrarPagamentoParcela(idParcela: string) : Promise<any>;

  ObterParcelasPorEmprestimo(idEmprestimo: string) : Promise<any>;

  ObterParcelaPorId(idParcela: string) : Promise<any>;

  ObterTodasParcelas() : Promise<any>;
}

export { IServicoParcela };