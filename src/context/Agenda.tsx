import React, { useEffect } from "react";
import { ReactNode, SetStateAction, createContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AgendaProps } from "../utils/Models";
import { v4 as uuidv4 } from 'uuid';

export interface AuthContextDataProps {
  DataArry: AgendaProps[];
  create: (data: AgendaProps) => void;
  deleteData: (itemId: string)=> void;
  updateData: (data: AgendaProps) => void

}

interface AuthContextProviderProps {
  children: ReactNode;

}


export const AuthContext = createContext({} as AuthContextDataProps);


export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [DataArry, setDataArry] = useState<AgendaProps[]>([]);

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
  async function create(data: AgendaProps) {
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
  async function updateData(data: AgendaProps) {

    
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
      DataArry

     
    }}
  >

    {children}
  </AuthContext.Provider>
)

}