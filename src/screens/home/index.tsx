
import React, { useState } from 'react';

import { Conteiner, ConteinerCard, Logo, Name } from './styles';
import { FlatList } from 'react-native-gesture-handler';
import CardList from '../../components/CardList';
import { BottomSheetComponent } from '../../components/BottomSheetComponent';

export default function Home() {
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const handleCardPress = () => {
        setIsBottomSheetOpen(true);
    };

    const handleBottomSheetToggle = () => {
        setIsBottomSheetOpen(!isBottomSheetOpen);
    };

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
                    renderItem={items => <CardList name={items.item.name} date={items.item.date} procedure={items.item.procedure} onCardPress={handleCardPress} />}
                />
            </ConteinerCard>
            <BottomSheetComponent
                isOpen={isBottomSheetOpen}
                toggle={handleBottomSheetToggle}
                snapPoints={['95%', '5%']}
            >
                {/* Conteúdo do seu modal */}
                <Name >Conteúdo do Modal</Name>
            </BottomSheetComponent>
        </Conteiner>
    );
}

