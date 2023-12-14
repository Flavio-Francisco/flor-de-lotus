import styled from "styled-components/native";
import { thema } from "../../../thema";

export const Conteiner = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 90%;
  border: 1px ${thema.colors.pink};
  border-radius: 10px;
  margin: 10px;
  margin-left: 15px;
`;
export const Name = styled.Text`
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: ${thema.colors.pink};
`;
export const Date = styled.Text`
  align-items: center;
  font-size: 18px;
  color: ${thema.colors.pink};
`;
export const Procedure = styled.Text`
  align-items: center;
  font-size: 18px;
  color: ${thema.colors.pink};
`;
