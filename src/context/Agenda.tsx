import React, { useEffect } from "react";
import { ReactNode, SetStateAction, createContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChildsRegistrationform } from "../utils/Models";
import { date } from "yup";
import moment from "moment";


export interface AuthContextDataProps {
  DataArry: ChildsRegistrationform[];
  records: ChildsRegistrationform[];
  create: (data: ChildsRegistrationform) => void;
  deleteData: (itemId: string) => void;
  deleteDataList: (itemId: string) => void;
  updateData: (data: ChildsRegistrationform) => void;
  setAvatar: (itemId: string | undefined, newAvatar: string, child: ChildsRegistrationform | undefined) => void;
  register: (data: ChildsRegistrationform) => Promise<void>;
  updateList: (data: ChildsRegistrationform) => void;
  valadation: boolean;
  setValidation: React.Dispatch<React.SetStateAction<boolean>>
  user: string | undefined;
  AvatarUser: (data: string | undefined) => void;

}

interface AuthContextProviderProps {
  children: ReactNode;

}


export const AuthContext = createContext({} as AuthContextDataProps);


export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [DataArry, setDataArry] = useState<ChildsRegistrationform[]>([]);
  const [records, setRecords] = useState<ChildsRegistrationform[]>([]);
  const [valadation, setValidation] = useState(false)
  const [user, setUser] = useState<string>()
  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem("userData");



      if (storagedUser) {
        const parsedData = JSON.parse(storagedUser);
        setDataArry(parsedData);
      }
    }
    async function imageUser() {
      const storagedUser = await AsyncStorage.getItem("user");

      if (storagedUser) {
        const parsedData = JSON.parse(storagedUser);
        setUser(parsedData);
      }
    }

    async function loadStorageData2() {
      const storagedUser = await AsyncStorage.getItem("Data");

      console.log(storagedUser);

      if (storagedUser) {
        const parsedData = JSON.parse(storagedUser);
        setRecords(parsedData);
      }
    }
    imageUser();
    loadStorageData2();
    loadStorageData();
    //clearDataArry()
  }, []);

  let idCounter = 1;

  function generateSequentialId(existingIds: string[]) {
    let newId = idCounter.toString();

    // Verificar se o ID já existe nos dados existentes
    while (existingIds.includes(newId)) {
      idCounter += 1;
      newId = idCounter.toString();
    }

    idCounter += 1;
    return newId;
  }
  async function create(data: ChildsRegistrationform) {
    if (data) {
      const existingIds = DataArry.map(item => item.id ?? '');
      const dataWithId = { ...data, id: generateSequentialId(existingIds) };
      try {
        const updatedDataArry = [...DataArry, dataWithId];
        await AsyncStorage.setItem('userData', JSON.stringify(updatedDataArry));
        setDataArry(updatedDataArry);

      } catch (error) {
        console.error("Error storing user data in AsyncStorage:", error);
      }
    }
  }
  async function register(data: ChildsRegistrationform) {
    if (data) {
      const existingIds = records.map(item => item.id ?? '');
      const dataWithId = { ...data, id: generateSequentialId(existingIds) };
      try {
        const updatedDataArry = [...records, dataWithId];
        await AsyncStorage.setItem('userData', JSON.stringify(updatedDataArry));
        setRecords(updatedDataArry);

      } catch (error) {
        console.error("Error storing user data in AsyncStorage:", error);
      }
    }
  }
  async function AvatarUser(data: string | undefined) {
    if (data) {

      try {

        await AsyncStorage.setItem('user', JSON.stringify(data));
        setUser(data);

      } catch (error) {
        console.error("Error storing user data in AsyncStorage:", error);
      }
    }
  }


  async function updateData(data: ChildsRegistrationform) {
    try {
      // Gerar um novo ID único com base no timestamp
      const novoId = Date.now().toString();

      // Adiciona o novo item ao array com o novo ID
      const updatedDataArry = [...DataArry, { ...data, id: novoId }];

      console.log("DataArry após adição do novo item:", updatedDataArry);

      // Atualiza AsyncStorage antes de manipular o estado local
      await AsyncStorage.setItem('userData', JSON.stringify(updatedDataArry));

      // Atualizando DataArry sempre, independentemente da comparação
      setDataArry(updatedDataArry);
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário no AsyncStorage:", error);
    }
  }

  async function updateList(data: ChildsRegistrationform) {
    try {
      console.log('====================================');
      console.log('item selecionado', data);
      console.log('====================================');

      // Ler os registros existentes do AsyncStorage
      const registrosAntigos = await AsyncStorage.getItem('Data');
      const registrosAntigosArray = registrosAntigos ? JSON.parse(registrosAntigos) : [];

      // Verificar se já existe um registro com os mesmos dados
      const registroExistente = registrosAntigosArray.find(
        (item: { nameChild: string | undefined; DateOfBirth: string | undefined; nameMother: string | undefined; }) =>
          item.nameChild === data.nameChild &&
          item.DateOfBirth === data.DateOfBirth &&
          item.nameMother === data.nameMother
      );

      if (registroExistente) {
        setValidation(true);
        return;
      }

      // Gerar um ID único com base no timestamp
      const novoId = Date.now().toString();

      // Criar um novo item com os dados fornecidos e o novo ID
      const novoItem = { ...data, id: novoId };

      // Criar um novo array adicionando o novo item aos registros existentes
      const arrayDadosAtualizado = [...registrosAntigosArray, novoItem];

      console.log('Registros após adição do novo item:', arrayDadosAtualizado);

      // Atualizar o AsyncStorage antes de manipular o estado local
      await AsyncStorage.setItem('Data', JSON.stringify(arrayDadosAtualizado));

      // Atualizar sempre o array de dados, independentemente da comparação
      setRecords(arrayDadosAtualizado);
    } catch (erro) {
      console.error('Erro ao atualizar dados do usuário no AsyncStorage:', erro);
    }
  }


  function setAvatar(itemId: string | undefined, newAvatar: string, child: ChildsRegistrationform | undefined) {
    try {
      // Atualizar o avatar em DataArry
      const updatedDataArry = DataArry.map(item => {
        if (itemId !== undefined && item.id === itemId) {
          return { ...item, avatar: newAvatar };
        }
        return item;
      });

      // Atualizar o AsyncStorage e o estado local de DataArry
      AsyncStorage.setItem('userData', JSON.stringify(updatedDataArry));
      setDataArry(updatedDataArry);

      // Atualizar o avatar em records
      const updatedRecords = records.map(item => {
        // Verificar as condições para atualizar o item
        if (
          item.DateOfBirth === child?.DateOfBirth && // Substitua pela condição desejada para a data de nascimento
          item.nameChild === child?.nameChild &&  // Substitua pelo nome da criança desejado
          item.nameMother === child?.nameMother // Substitua pelo nome da mãe desejado
        ) {
          return { ...item, avatar: newAvatar };
        }
        return item;
      });

      // Atualizar o AsyncStorage e o estado local de records
      AsyncStorage.setItem('Data', JSON.stringify(updatedRecords));
      setRecords(updatedRecords);
    } catch (error) {
      console.log(error);
    }
  }



  function deleteData(itemId: string) {
    try {
      const updatedDataArry = DataArry.filter(item => item.id !== itemId);
      AsyncStorage.setItem('userData', JSON.stringify(updatedDataArry));
      setDataArry(updatedDataArry);

      // Removendo o item de Data se estiver atualmente presente

    } catch (error) {
      console.error("Error removing user data from AsyncStorage:", error);
    }
  }

  function clearDataArry() {
    try {
      // Criar um array vazio para limpar DataArry
      const emptyDataArry: ChildsRegistrationform[] = [];

      // Atualizar o AsyncStorage e o estado local de DataArry com o array vazio
      AsyncStorage.setItem('userData', JSON.stringify(emptyDataArry));
      setDataArry(emptyDataArry);
    } catch (error) {
      console.error("Error clearing user data from AsyncStorage:", error);
    }
  }

  async function dueDate() {
    try {
      const currentDate = moment();

      // Filtrar os itens com base na condição de data
      const updatedDataArry = DataArry.filter(item => {
        const itemDate = moment(item.date); // Converter a data do item para um objeto moment
        return itemDate.isAfter(currentDate.add(1, 'day')); // Comparar com a data atual
      });

      // Atualizar AsyncStorage e o estado local com os dados filtrados
      await AsyncStorage.setItem('userData', JSON.stringify(updatedDataArry));
      setDataArry(updatedDataArry);

    } catch (error) {
      console.error("Error removing user data from AsyncStorage:", error);
    }
  }



  function deleteDataList(itemId: string) {
    try {
      const updatedDataArry = DataArry.filter(item => item.id !== itemId);
      AsyncStorage.setItem('Data', JSON.stringify(updatedDataArry));
      setRecords(updatedDataArry);

      // Removendo o item de Data se estiver atualmente presente

    } catch (error) {
      console.error("Error removing user data from AsyncStorage:", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        create,
        deleteData,
        updateData,
        DataArry,
        setAvatar,
        register,
        records,
        updateList,
        deleteDataList,
        setValidation,
        valadation,
        user,
        AvatarUser
      }}
    >

      {children}
    </AuthContext.Provider>
  )

}