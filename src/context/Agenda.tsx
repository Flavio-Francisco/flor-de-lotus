import React, { useEffect } from "react";
import { ReactNode, SetStateAction, createContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AgendaProps } from "../utils/Models";
import { v4 as uuidv4 } from 'uuid';








export interface AuthContextDataProps {
  Data: AgendaProps;
  create: (data: AgendaProps) => void;
  deleteData: () => void;
  updateData: (data: AgendaProps) => void

}

interface AuthContextProviderProps {
  children: ReactNode;

}


export const AuthContext = createContext({} as AuthContextDataProps);


export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [Data, setData] = useState<AgendaProps>({} as AgendaProps);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem("userData");

      console.log(storagedUser);

      if (storagedUser) {
        setData(JSON.parse(storagedUser));
      }
    }


    loadStorageData();
  }, []);


  async function create(data: AgendaProps) {
    if (data) {
      const dataWithId = { ...data, id: uuidv4() };
      try {
        await AsyncStorage.setItem('userData', JSON.stringify(dataWithId ));
        setData(dataWithId )

      } catch (error) {
        console.error("Error storing user data in AsyncStorage:", error);
      }

    }

  }
  function updateData(data: AgendaProps) {
    try {
      const userData = data;
      AsyncStorage.setItem('userData', JSON.stringify(userData));

    } catch (error) {

    }
  }





  function deleteData ():void {

    AsyncStorage.removeItem('userData').catch((error:any) => {
      console.error("Error removing user data from AsyncStorage:", error);
    }),

    setData({
      id: '',
      date: '',
      name: '',
      procedure: '',
      money: '',
      note: '',
      taggert: undefined,
    },

    );


}

return (
  <AuthContext.Provider
    value={{
      create,
      Data,
      deleteData,
      updateData,

     
    }}
  >

    {children}
  </AuthContext.Provider>
)

}