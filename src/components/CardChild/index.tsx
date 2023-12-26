import React from "react";
import { Avatar, Conteiner, ConteinerAvatar, ConteinerInf, Name, Date, Age, ConteinerRow } from "./styles";
import { colorChold } from "../../../thema";
import { calcularIdade, calcularIdadeComAniversario } from "../../utils/Function";
import { View } from 'react-native';

interface Iprops {
    name: string | undefined;
    date: string | undefined;
    avatar: string;
    age: string;
    childGender: boolean | undefined;
    onCardPress: () => void;
}

export default function CardChild(props: Iprops) {

    const date = calcularIdade(props.date);
    const age = calcularIdadeComAniversario(date)
    return (
        <Conteiner onPress={()=> props.onCardPress()} style={{ borderWidth: 1, borderColor: colorChold(props.childGender), borderRadius: 5 }} >
            <ConteinerRow>
                <ConteinerAvatar>
                    <Avatar source={require('../../../assets/leninha.jpg')} />
                </ConteinerAvatar>
                <ConteinerInf>
                    <Date style={{ color: colorChold(props.childGender) }}>Data: {date}</Date>
                    <Name style={{ color: colorChold(props.childGender) }}>Nome: {props.name}</Name>
                    <Age style={{ color: colorChold(props.childGender) }}>Idade: {age}</Age>
                </ConteinerInf>
            </ConteinerRow>
        </Conteiner>
    )

}