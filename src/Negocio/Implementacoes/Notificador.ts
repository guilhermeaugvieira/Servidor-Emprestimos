import { Lifecycle, scoped } from "tsyringe";
import { INotificador } from "../Interfaces/INotificador";

@scoped(Lifecycle.ContainerScoped)
class Notificador implements INotificador{  
  private Mensagens: String[];

  constructor() {
    this.Mensagens = [];
  }
  TemNotificacao(): Boolean {
    return this.Mensagens.length > 0;
  }
  
  AdicionarNotificacao(mensagem: String): void {
    this.Mensagens.push(mensagem);  
  }

  ObterNotificacoes(): String[] {
    return this.Mensagens;
  }
}

export { Notificador };