import styled from "styled-components/native";
import { thema } from "../../../thema";

export const Conteiner = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const Logo = styled.Image`
  width: 150px;
  height: 150px;
  margin-top: 50px;
  margin-bottom: 5px;
`;
export const ConteinerCard = styled.View`
  width: 90%;
  height: 580px;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 5px;
`;
export const Name = styled.Text`
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: ${thema.colors.pink};
`;
export const Title = styled.Text`
  align-items: center;
  font-size: 22px;
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
