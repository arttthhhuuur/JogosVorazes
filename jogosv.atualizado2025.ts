class Distrito {
  private nome: string;
  private recursos: string[];
  private populacao: number;

  constructor(nome: string, recursos: string[], populacao: number) {
    this.nome = nome;
    this.recursos = recursos;
    this.populacao = populacao;
  }

  public getRecursos(): string[] {
    return this.recursos;
  }

  public coletarRecurso(tributo: Tributo, recurso: string): void {
    if (this.recursos.includes(recurso)) {
      console.log(`${tributo.getNome()} coletou ${recurso} do distrito ${this.nome}.`);
    } else {
      console.log(`Recurso ${recurso} não disponível no distrito ${this.nome}.`);
    }
  }
}

class Habilidade {
  private nome: string;
  
  constructor(nome: string) {
      this.nome = nome;
  }
  
  public getNome(): string {
      return this.nome;
  }
}

class Tributo {
  private nome: string;
  private saude: number;
  private distrito: Distrito;
  private segredo: string;
  private habilidades: Habilidade[];
  private resistencia: number;
  private armadura: number;

  constructor(nome: string, saude: number, distrito: Distrito, segredo: string, habilidades: Habilidade[], resistencia: number, armadura: number) {
    this.nome = nome;
    this.saude = saude;
    this.distrito = distrito;
    this.segredo = segredo;
    this.habilidades = habilidades;
    this.resistencia = resistencia;
    this.armadura = armadura;
  }

  public getNome(): string {
    return this.nome;
  }

  public coletarRecurso(recurso: string): void {
    this.distrito.coletarRecurso(this, recurso);
  }

  private calcularDano(danoBase: number): number {
      return Math.max(danoBase - (this.resistencia + this.armadura), 0);
  }

  public sofrerDano(danoBase: number): void {
      const danoFinal = this.calcularDano(danoBase);
      this.saude -= danoFinal;
      console.log(`${this.nome} sofreu ${danoFinal} de dano. Saúde restante: ${this.saude}`);
  }

  public exibirHabilidades(): void {
      console.log(`${this.nome} possui as seguintes habilidades:`);
      this.habilidades.forEach(habilidade => console.log(`- ${habilidade.getNome()}`));
  }
}

class Organizador {
  private nome: string;
  private distritos: Distrito[];

  constructor(nome: string, distritos: Distrito[]) {
    this.nome = nome;
    this.distritos = distritos;
  }

  public liberarAnimais(): void {
    console.log(`${this.nome} liberou animais na arena!`);
  }

  public criarDesastre(): void {
    console.log(`${this.nome} criou um desastre na arena!`);
  }
}

// Criando os distritos
const distrito1 = new Distrito("Distrito 1", ["Água", "Comida", "Madeira"], 1000);
const distrito2 = new Distrito("Distrito 2", ["Ferro", "Pedra", "Ervas"], 800);

// Criando habilidades
const habilidade1 = new Habilidade("Sobrevivência");
const habilidade2 = new Habilidade("Habilidade com arco");
const habilidade3 = new Habilidade("Camuflagem");
const habilidade4 = new Habilidade("Combate corpo a corpo");

// Criando os tributos
const tributo1 = new Tributo("Katniss", 100, distrito1, "Arqueira furtiva", [habilidade1, habilidade2], 10, 5);
const tributo2 = new Tributo("Peeta", 50, distrito2, "Força bruta", [habilidade3, habilidade4], 15, 10);

// Criando o organizador
const organizador = new Organizador("Senhor da Arena", [distrito1, distrito2]);

// Teste das interações
tributo1.coletarRecurso("Água");
tributo2.coletarRecurso("Ferro");
organizador.liberarAnimais();
organizador.criarDesastre();
tributo1.sofrerDano(20);
tributo2.sofrerDano(25);
tributo1.exibirHabilidades();
tributo2.exibirHabilidades();
