import { ChildsRegistrationform } from "./Models";

// Função para calcular a idade com base na data de nascimento e retornar com máscara
export function calcularIdade(dataNascimento: string | undefined): string {
  if (!dataNascimento) {
    return "";
  }

  // Converte a string de data para um objeto Date
  const dataNascimentoDate = new Date(dataNascimento);

  // Obtém o dia, mês e ano da data de nascimento
  const dia = dataNascimento.substring(0, 2);
  const mes = dataNascimento.substring(2, 5); // O mês é base 0, por isso é necessário adicionar 1
  const ano = dataNascimento.substring(5, 10);

  // Retorna a data formatada com a máscara
  return `${dia}/${mes}/${ano}`;
}

export function calcularIdadeComAniversario(
  dataNascimento: string | undefined
): number | undefined {
  if (!dataNascimento) {
    return undefined;
  }

  // Divida a data de nascimento em dia, mês e ano
  const partes = dataNascimento.split("/");

  // Verifique se há três partes na data
  if (partes.length !== 3) {
    console.error("Formato de data inválido:", dataNascimento);
    return undefined;
  }

  const diaNascimento = parseInt(partes[0], 10);
  const mesNascimento = parseInt(partes[1], 10) - 1; // O mês é base 0 no JavaScript
  const anoNascimento = parseInt(partes[2], 10);

  // Verifique se os valores obtidos são válidos
  if (isNaN(diaNascimento) || isNaN(mesNascimento) || isNaN(anoNascimento)) {
    console.error("Valores inválidos na data:", dataNascimento);
    return undefined;
  }

  // Crie objetos Date para a data de nascimento e a data atual
  const dataNascimentoDate = new Date(
    anoNascimento,
    mesNascimento,
    diaNascimento
  );
  const dataAtual = new Date();

  // Verifique se o aniversário já ocorreu neste ano
  const aniversarioOcorreuEsteAno =
    dataAtual.getMonth() > mesNascimento ||
    (dataAtual.getMonth() === mesNascimento &&
      dataAtual.getDate() >= diaNascimento);

  // Calcule a diferença de anos entre as datas
  const diferencaAnos =
    dataAtual.getFullYear() -
    anoNascimento -
    (aniversarioOcorreuEsteAno ? 0 : 1);

  return diferencaAnos;
}

// Função para gerar dados fictícios
function generateFakeData(): ChildsRegistrationform {
  const getRandomDate = () => {
    const year = 2000 + Math.floor(Math.random() * 10);
    const month = 1 + Math.floor(Math.random() * 12);
    const day = 1 + Math.floor(Math.random() * 28);
    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  };

  return {
    date: getRandomDate(),
    avatar: "fake-avatar-url",
    ChildGender: Math.random() < 0.5,
    DateOfBirth: getRandomDate(),
    nameChild: "Fake Child",
    nameMother: "Fake Mother",
    nameFather: "Fake Father",
    phone: "81992477066",
    Address: {
      street: "Fake Street",
      number: String(Math.floor(Math.random() * 100)),
      Neighborhood: "Fake Neighborhood",
      city: "Fake City",
    },
    ChildInformation: {
      allergy: Math.random() < 0.5,
      WhichAllergy: "Fake Allergy",
      DietaryRestriction: Math.random() < 0.5,
      WhichDietaryRestriction: "Fake Dietary Restriction",
      drug: Math.random() < 0.5,
      WhichDrug: "Fake Drug",
      HealthInsurance: Math.random() < 0.5,
      WhichHealthInsurance: "Fake Health Insurance",
      MarmosetType: "Fake Marmoset Type",
    },
    ImportantInformation: {
      Daily: true,
      WhichDaily: "500",
      overnight: false,
      WhichOvernight: "",
      travel: false,
      WhichTravel: "",
      stroll: false,
      WhichStroll: "",
    },
  };
}

export function formatarTelefone(telefone: string | undefined): string {
  // Remover caracteres não numéricos
  const numeros = telefone?.replace(/\D/g, "");

  // Aplicar a máscara (xx) xxxx-xxxx
  const parte1 = numeros?.slice(0, 2);
  const parte2 = numeros?.slice(2, 7);
  const parte3 = numeros?.slice(7, 11);

  const telefoneFormatado = `(${parte1}) ${parte2}-${parte3}`;

  return telefoneFormatado;
}

export function Check(data: boolean | string | undefined) {
  if (data === true || data === "true") {
    return true;
  } else if (data === undefined || data ==="") {
    return false;
  } else {
    return false;
  }
}
