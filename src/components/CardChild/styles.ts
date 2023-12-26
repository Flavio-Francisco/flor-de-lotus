import styled from "styled-components/native";
import { thema } from "../../../thema";

export const Conteiner = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;
export const Avatar = styled.Image`
  height: 90px;
  width: 90px;
  border-radius: 75px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
export const ConteinerAvatar = styled.View`
  align-items: center;
  justify-content: center;
`;
export const ConteinerRow = styled.View`
  width: 90%;
  flex-direction: row;
  gap: 30px;
`;
export const ConteinerInf = styled.View`
  align-items: center;
  justify-content: center;
  margin-left: 15px;
`;
export const Name = styled.Text`
  align-items: center;
  font-size: 18px;
  
`;
export const Date = styled.Text`
  align-items: center;
  font-size: 18px;
`;
export const Age = styled.Text`
  align-items: center;
  font-size: 18px;
`;
