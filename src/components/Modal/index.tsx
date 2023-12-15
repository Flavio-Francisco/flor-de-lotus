import React, { useState, useEffect } from "react";
import { Modal, ScrollView, View, Button } from "react-native";
import {
    ButtomModal,
    ConteinerData,
    ConteinerData2,
    ConteinerDataview,
    ConteinerModal,
    Data,
    TextButtom,
    TextData,
    TextDataObs,
    Title,
} from "./styles";
import { AgendaProps } from "../../utils/Models";

interface Ipros extends AgendaProps {
    isVisible: boolean;
    onHide: () => void;
}

export default function ModalObs({

    onHide,
    date,
    name,
    procedure,
    money,
    note,
}: Ipros) {
    const hideModalHandler = () => {
        onHide();
    };


    return (
        <>

            <Title>Dados do Agendamento</Title>
            <ConteinerModal>
                <ConteinerData>
                    <TextData>Nome: </TextData>
                    <Data>{name}</Data>
                </ConteinerData>
                <ConteinerData>
                    <TextData>Data: </TextData>
                    <Data>{date}</Data>
                </ConteinerData>

                <ConteinerData>
                    <TextData>Procedimento: </TextData>
                    <Data>{procedure}</Data>
                </ConteinerData>
                <ConteinerData>
                    <TextData>Valor: </TextData>
                    <Data>{money}</Data>
                </ConteinerData>
                <TextDataObs>Observações: </TextDataObs>
                <ConteinerData2>

                    <Data>{note}</Data>
                </ConteinerData2>
                <ButtomModal onPress={hideModalHandler}>
                    <TextButtom>Fechar</TextButtom>
                </ButtomModal>
            </ConteinerModal>

        </>
    );
}