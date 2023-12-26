import styled from "styled-components/native";
import { thema } from "../../../thema";

export const Conteiner = styled.ScrollView`
  flex: 1;
  width: 100%;
  
`;
export const Logo = styled.Image`
  width: 150px;
  height: 150px;
  margin-top: 60px;
`;
export const ConteinerdDateMoney = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 90%;
`;
export const InputDate = styled.TextInput`
  width: 90%;
  height: 50px;
  border: 1px ${thema.colors.pink};
  border-radius: 10px;
  padding: 7px;
  color: ${thema.colors.pink};
`;
export const InputMoney = styled.TextInput`
  width: 90%;
  height: 50px;
  border: 1px ${thema.colors.pink};
  border-radius: 10px;
  padding: 7px;
  color: ${thema.colors.pink};
`;
export const Input = styled.TextInput`
  width: 90%;
  height: 50px;
  border: 1px ${thema.colors.pink};
  border-radius: 10px;
  padding: 7px;
  color: ${thema.colors.pink};
`;
export const InputNote = styled.TextInput`
  width: 90%;
  height: 150px;
  border: 1px ${thema.colors.pink};
  border-radius: 10px;
  padding: 7px;
  color: ${thema.colors.pink};
`;
export const InputChek = styled.TextInput`
  width: 60%;
  height: 22px;
  color: ${thema.colors.pink};
  
`;
export const Label = styled.Text`
  font-size: 16px;
  color: ${thema.colors.pink};
`;
export const ButtomSubmit = styled.TouchableOpacity`
  width: 60%;
  height: 55px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin: 20px;
  margin-left: 15px;
  margin-top: 55px;
  background-color: ${thema.colors.pink};
`;
export const TextSubmit = styled.Text`
  font-size: 20px;
  color: ${thema.colors.white};
`;
export const Title = styled.Text`
  font-size: 20px;
  font-weight:bold;
  margin-top: 15px;
  margin-left: 15px;
  margin-bottom: 15px;
  color: ${thema.colors.pink};
`;
export const TextCheck = styled.Text`
  font-size: 16px;
  align-items: center;
  
`;