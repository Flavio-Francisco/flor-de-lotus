
import { ChildsRegistrationform } from './Models';





// Função para calcular a idade com base na data de nascimento e retornar com máscara
export function calcularIdade(dataNascimento: string | undefined): string {
  if (!dataNascimento) {
    return '';
  }

  // Converte a string de data para um objeto Date
  const dataNascimentoDate = new Date(dataNascimento);

  // Obtém o dia, mês e ano da data de nascimento
  const dia = dataNascimentoDate.getDate().toString().padStart(2, '0');
  const mes = (dataNascimentoDate.getMonth() + 1).toString().padStart(2, '0'); // O mês é base 0, por isso é necessário adicionar 1
  const ano = dataNascimentoDate.getFullYear();

  // Retorna a data formatada com a máscara
  return `${dia}/${mes}/${ano}`;
}
export function calcularIdadeComAniversario(dataNascimento: string | undefined): number | undefined {
  if (!dataNascimento) {
    return undefined;
  }

  // Divida a data de nascimento em dia, mês e ano
  const partes = dataNascimento.split('/');
  const diaNascimento = parseInt(partes[0], 10);
  const mesNascimento = parseInt(partes[1], 10) - 1; // O mês é base 0 no JavaScript
  const anoNascimento = parseInt(partes[2], 10);

  // Crie objetos Date para a data de nascimento e a data atual
  const dataNascimentoDate = new Date(anoNascimento, mesNascimento, diaNascimento);
  const dataAtual = new Date();

  // Verifique se o aniversário já ocorreu neste ano
  const aniversarioOcorreuEsteAno =
    dataAtual.getMonth() > mesNascimento ||
    (dataAtual.getMonth() === mesNascimento && dataAtual.getDate() >= diaNascimento);

  // Calcule a diferença de anos entre as datas
  const diferencaAnos = dataAtual.getFullYear() - anoNascimento - (aniversarioOcorreuEsteAno ? 0 : 1);

  return diferencaAnos;
}


  
  // Função para gerar dados fictícios
  function generateFakeData(): ChildsRegistrationform {
    const getRandomDate = () => {
      const year = 2000 + Math.floor(Math.random() * 10);
      const month = 1 + Math.floor(Math.random() * 12);
      const day = 1 + Math.floor(Math.random() * 28);
      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    };
  
    return {
      date: getRandomDate(),
      avatar: 'fake-avatar-url',
      ChildGender: Math.random() < 0.5,
      DateOfBirth: getRandomDate(),
      nameChild: 'Fake Child',
      nameMother: 'Fake Mother',
      nameFather: 'Fake Father',
      phone:'81992477066',
      Address: {
        street: 'Fake Street',
        number: Math.floor(Math.random() * 100),
        Neighborhood: 'Fake Neighborhood',
        city: 'Fake City',
      },
      ChildInformation: {
        allergy: Math.random() < 0.5,
        WhichAllergy: 'Fake Allergy',
        DietaryRestriction: Math.random() < 0.5,
        WhichDietaryRestriction: 'Fake Dietary Restriction',
        drug: Math.random() < 0.5,
        WhichDrug: 'Fake Drug',
        HealthInsurance: Math.random() < 0.5,
        WhichHealthInsurance: 'Fake Health Insurance',
        MarmosetType: 'Fake Marmoset Type',
      },
      ImportantInformation: {
        Daily: true,
        WhichDaily:'500',
        overnight: false,
        WhichOvernight:'',
        travel: false,
        WhichTravel:'',
        stroll: false,
        WhichStroll:'',
      },
    };
  }
  export const fakeDataArray: ChildsRegistrationform[] = Array.from({ length: 1 }, generateFakeData);

 export function formatarTelefone(telefone: string|undefined): string {
    // Remover caracteres não numéricos
    const numeros = telefone?.replace(/\D/g, '');
  
    // Aplicar a máscara (xx) xxxx-xxxx
    const parte1 = numeros?.slice(0, 2);
    const parte2 = numeros?.slice(2, 6);
    const parte3 = numeros?.slice(6, 10);
  
    const telefoneFormatado = `(${parte1}) ${parte2}-${parte3}`;
  
    return telefoneFormatado;
  }
  

