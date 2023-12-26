import React, { useEffect } from "react";
import { ReactNode, SetStateAction, createContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AgendaProps, ChildsRegistrationform } from "../utils/Models";
import { v4 as uuidv4 } from 'uuid';

export interface AuthContextDataProps {
  DataArry: ChildsRegistrationform[];
  create: (data: ChildsRegistrationform) => void;
  deleteData: (itemId: string) => void;
  updateData: (data: ChildsRegistrationform) => void
  setAvatar: (data:ChildsRegistrationform) => void
}

interface AuthContextProviderProps {
  children: ReactNode;

}


export const AuthContext = createContext({} as AuthContextDataProps);


export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [DataArry, setDataArry] = useState<ChildsRegistrationform[]>([]);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem("userData");

      console.log(storagedUser);

      if (storagedUser) {
        const parsedData = JSON.parse(storagedUser);
        setDataArry(parsedData);
      }
    }

    loadStorageData();
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
  async function create(data:ChildsRegistrationform) {
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
  async function updateData(data: ChildsRegistrationform) {

    try {


      const updatedDataArry = DataArry.map(item => (item.id === data.id ? data : item));

      console.log("DataArry após mapeamento:", updatedDataArry);

      // Atualiza AsyncStorage antes de manipular o estado local
      await AsyncStorage.setItem('userData', JSON.stringify(updatedDataArry));



      // Atualizando DataArry sempre, independentemente da comparação
      setDataArry(updatedDataArry);


    } catch (error) {
      console.error("Erro ao atualizar dados do usuário no AsyncStorage:", error);
    }
  }
  function setAvatar(data:ChildsRegistrationform) {

    try {
      let Data: ChildsRegistrationform = {
        avatar: "",
        date: undefined,
        DateOfBirth: undefined,
        nameChild: undefined,
        nameMother: undefined,
        nameFather: undefined,
        Address: {
          street: undefined,
          number: undefined,
          Neighborhood: undefined,
          city: undefined
        },
        ChildInformation: {
          allergy: undefined,
          WhichAllergy: undefined,
          DietaryRestriction: undefined,
          WhichDietaryRestriction: undefined,
          drug: undefined,
          WhichDrug: undefined,
          HealthInsurance: undefined,
          WhichHealthInsurance: undefined,
          MarmosetType: undefined
        },
        ImportantInformation: {
          Daily: undefined,
          overnight: undefined,
          travel: undefined,
          stroll: undefined
        },
        ChildGender: undefined
      };
      Data.avatar = data.avatar;
      AsyncStorage.setItem('userData', JSON.stringify(Data));

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

  return (
    <AuthContext.Provider
      value={{
        create,
        deleteData,
        updateData,
        DataArry,
        setAvatar
      }}
    >

      {children}
    </AuthContext.Provider>
  )

}