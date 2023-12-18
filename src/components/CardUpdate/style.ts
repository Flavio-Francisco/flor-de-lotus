import styled from "styled-components/native";
import { thema } from "../../../thema";

export const Conteiner = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const ConteinerdDateMoney = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 90%;
  margin-top:45px;
`;
export const InputDate = styled.TextInput`
  width: 90%;
  height: 50px;
  border: 1px ${thema.colors.pink};
  border-radius: 10px;
  padding:7px;
  color:${thema.colors.pink};
`;
export const InputMoney = styled.TextInput`
  width: 90%;
  height: 50px;
  border: 1px ${thema.colors.pink};
  border-radius: 10px;
  padding:7px;
  color:${thema.colors.pink};
`;
export const Input = styled.TextInput`
  width: 90%;
  height: 50px;
  border: 1px ${thema.colors.pink};
  border-radius: 10px;
  padding:7px;
  color:${thema.colors.pink};
`;
export const InputNote = styled.TextInput`
  width: 90%;
  height: 150px;
  border: 1px ${thema.colors.pink};
  border-radius: 10px;
  padding:7px;
  color:${thema.colors.pink};
`;
export const Label = styled.Text`
  font-size: 20px;
  color: ${thema.colors.pink};
`;
export const ButtomSubmit = styled.TouchableOpacity`
  width: 60%;
  height: 55px;
  align-items:center;
  justify-content:center;
  border-radius: 10px;
  margin:20px;
  margin-left:15px;
  margin-top:55px;
  background-color: ${thema.colors.pink};
`;
export const TextSubmit = styled.Text`
  font-size: 20px;
  color: ${thema.colors.white};
`;