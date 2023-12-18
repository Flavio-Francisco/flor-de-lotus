import styled from "styled-components/native";
import { thema } from "../../../thema";

export const ButtomModal = styled.TouchableOpacity`
  width: 40%;
  height: 55px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin: 20px;
  margin-left: 12px;
  background-color: ${thema.colors.pink};
`;
export const ButtomModalDelete = styled.TouchableOpacity`
  flex-direction: row;
  width: 40%;
  height: 55px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  gap:5px;
  margin: 20px;
  margin-left: 12px;
  background-color: ${thema.colors.violeta};
`;
export const TextButtom = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${thema.colors.white};
`;
//Modal

export const ConteinerModal = styled.View`
  width: 90%;
  height: 680px;
  border-radius: 10px;
  margin-left: 15px;
  margin-top: 10px;
  border: 1px ${thema.colors.pink};
`;
export const ConteinerData = styled.View`
  flex-direction: row;
  margin-left: 10px;
  margin-top: 10px;
`;
export const ConteinerButtom = styled.View`
  flex-direction: row;
  margin-left: 10px;
  margin-top: 10px;
`;
export const ConteinerDataview = styled.View`
  flex: 1;
  margin-left: 10px;
  margin-top: 10px;
`;
export const ConteinerData2 = styled.ScrollView`
  flex: 1;
  width: 90%;
  margin-left: 16px;
  margin-top: 10px;
  padding: 5px;
  border-radius: 10px;
  border: 1px ${thema.colors.pink};
`;
export const Title = styled.Text`
  height: 30px;
  margin-left: 20%;
  margin-top: 35px;
  align-items: center;
  font-size: 22px;
  font-weight: bold;
  color: ${thema.colors.pink};
`;
export const TextData = styled.Text`
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: ${thema.colors.pink};
`;
export const TextDataObs = styled.Text`
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  margin-top: 5px;
  color: ${thema.colors.pink};
`;
export const Data = styled.Text`
  margin-top: 2px;
  font-size: 20px;
  align-items: center;
  color: ${thema.colors.pink};
`;
