import styled from 'styled-components/native';
import {Feather} from '@expo/vector-icons';
import { thema } from '../../../thema';


export const Icon = styled(Feather)`
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 20px;
  z-index: 99;
  color: ${thema.colors.pink};

`;

export const Button = styled.TouchableOpacity`
  z-index: 99;
`;