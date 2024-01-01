import React from "react";
import { Avatar, Conteiner, ConteinerAvatar, ConteinerInf, Name, Date, Age, ConteinerRow } from "./styles";
import { colorChold } from "../../../thema";
import { calcularIdade, calcularIdadeComAniversario } from "../../utils/Function";
import { View } from 'react-native';

interface Iprops {
    name: string | undefined;
    date: string | undefined;
    avatar: string | undefined;
    age: string | undefined;
    childGender: boolean | string | undefined;
    onCardPress: () => void;
}

export default function CardChild(props: Iprops) {

    const date = calcularIdade(props.date);
    const age = calcularIdadeComAniversario(props.age)
    return (
        <Conteiner onPress={() => props.onCardPress()} style={{ borderWidth: 1, borderColor: colorChold(props.childGender), borderRadius: 5 }} >
            <ConteinerRow>
                <ConteinerAvatar>
                    <Avatar source={props.avatar ? { uri: props.avatar } : require('../../../assets/foto.jpg')}
                        style={{ backgroundColor: colorChold(props.childGender) }}
                    />
                </ConteinerAvatar>
                <ConteinerInf>
                    <Date style={{ color: colorChold(props.childGender) }}>Data: {props.date}</Date>
                    <Name style={{ color: colorChold(props.childGender) }}>Nome: {props.name}</Name>
                    <Age style={{ color: colorChold(props.childGender) }}>Idade: {age}</Age>
                </ConteinerInf>
            </ConteinerRow>
        </Conteiner>
    )

}