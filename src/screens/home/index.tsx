
import React, { useState } from 'react';

import { Conteiner, ConteinerCard, Logo, Name, } from './styles';
import { FlatList } from 'react-native-gesture-handler';
import CardList from '../../components/CardList';

import { AgendaProps } from '../../utils/Models';
import ModalObs from '../../components/Modal';
import { Modal } from 'react-native';


export default function Home() {
    const [isModalOpen, setIsModalSheetOpen] = useState(false);

    const [selectedItem, setSelectedItem] = useState<AgendaProps>();
    const handleCardPress = (item: AgendaProps) => {
        setSelectedItem(item);
        setIsModalSheetOpen(true);
        console.log(selectedItem, isModalOpen);

    };
    const closeModal = () => {
        setIsModalSheetOpen(false);
    }



    const FackData = [
        {
            id: '1',
            date: '25/12/2023',
            name: 'Ângela Sampaio',
            procedure: 'Massagem',
            money: 'R$ 25,000',
            note: 'gatona',
        },
        {
            id: '2',
            date: '25/12/2023',
            name: 'Ângela Sampaio',
            procedure: 'Massagem',
            money: 'R$ 25,000',
            note: 'gatona',
        },
        {
            id: '3',
            date: '25/12/2023',
            name: 'Ângela Sampaio',
            procedure: 'Massagem',
            money: 'R$ 25,000',
            note: 'gatona',
        },
        {
            id: '4',
            date: '25/12/2023',
            name: 'Ângela Sampaio',
            procedure: 'Massagem',
            money: 'R$ 25,000',
            note: 'gatona',
        },
        {
            id: '5',
            date: '25/12/2023',
            name: 'Ângela Sampaio',
            procedure: 'Massagem',
            money: 'R$ 25,000',
            note: 'gatona',
        },
        {
            id: '6',
            date: '25/12/2023',
            name: 'Ângela Sampaio',
            procedure: 'Massagem',
            money: 'R$ 25,000',
            note: 'gatona',
        },
        {
            id: '7',
            date: '25/12/2023',
            name: 'Ângela Sampaio',
            procedure: 'Massagem',
            money: 'R$ 25,000',
            note: 'gatona',
        },
    ]

    return (
        <Conteiner>
            <Logo source={require('../../../assets/logo.webp')} />
            <ConteinerCard >
                <FlatList
                    data={FackData}
                    keyExtractor={items => items.id}
                    renderItem={items => <CardList name={items.item.name} date={items.item.date} procedure={items.item.procedure} onCardPress={() => handleCardPress(items.item)} />}
                />
            </ConteinerCard>
            <Modal
                animationType="slide"
                transparent={false}
                visible={isModalOpen}
                onRequestClose={closeModal}
            >
                <ModalObs
                    date={selectedItem?.date}
                    name={selectedItem?.name}
                    procedure={selectedItem?.procedure}
                    money={selectedItem?.money}
                    note='Em nota, as Forças de Defesa de Israel chamaram o caso de "incidente" e disseram que aprenderam  com o episódio, mas afirmaram que seguirão em busca dos reféns ainda em poder do Hamas.

                    "Enfatizamos que esta é uma zona de combate ativa na qual ocorreram combates contínuos nos últimos dias. Foram aprendidas lições imediatas do evento, que foram transmitidas a todas as tropas em terreno. Expressamos profundo pesar pelo trágico incidente, e enviamos às famílias as mais sinceras condolências. Nossa missão nacional é localizar os desaparecidos e devolver todos os reféns para casa", disse o Exército, em comunicado.
                    
                    O Exército de Israel não havia informado, até a última atualização desta reportagem, onde exatamente estavam os reféns no momento em que foram alvejados pelos soldados - há relatos de que a maior parte dos'
                    taggert={isModalOpen} isVisible={false}
                    onHide={closeModal}
                />
            </Modal>
        </Conteiner>
    );
}

