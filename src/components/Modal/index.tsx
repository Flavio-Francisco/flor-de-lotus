import React, { useState, useEffect } from "react";
import { AntDesign } from '@expo/vector-icons';
import {
    ButtomModal,
    ButtomModalDelete,
    ConteinerButtom,
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
import { thema } from "../../../thema";

interface Ipros extends AgendaProps {
    isVisible: boolean;
    onHide: () => void;
    deleteTime: () => void;
}

export default function ModalObs({
    deleteTime,
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
    const ModalHandlerDelete = () => {
        deleteTime();
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
                <ConteinerButtom>
                    <ButtomModal onPress={hideModalHandler}>
                        <TextButtom>Fechar</TextButtom>
                    </ButtomModal>
                    <ButtomModalDelete  onPress={ModalHandlerDelete}>
                        <AntDesign name="delete" size={24} color={thema.colors.white} />
                        <TextButtom>Excluir</TextButtom>
                    </ButtomModalDelete>
                </ConteinerButtom>

            </ConteinerModal>

        </>
    );
}