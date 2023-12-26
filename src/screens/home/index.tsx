
import React, { useContext, useEffect, useState } from 'react';

import { Conteiner, ConteinerCard, Logo, Name, } from './styles';
import { FlatList } from 'react-native-gesture-handler';
import CardList from '../../components/CardList';

import { AgendaProps, ChildsRegistrationform } from '../../utils/Models';
import ModalObs from '../../components/Modal';
import { Modal } from 'react-native';
import { Title } from '../update/styles';
import AwesomeAlert from 'react-native-awesome-alerts';
import { thema } from '../../../thema';
import { AuthContext } from '../../context/Agenda';
import { useFocusEffect } from '@react-navigation/native';
import CardChild from '../../components/CardChild';
import { fakeDataArray } from '../../utils/Function';


export default function Home() {
    const [isModalOpen, setIsModalSheetOpen] = useState(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const { DataArry, deleteData } = useContext(AuthContext);
    const showAlertHandler = () => {
        setShowAlert(true);

    };

    const hideAlertHandler = () => {
        setShowAlert(false);
    };


    const [selectedItem, setSelectedItem] = useState<ChildsRegistrationform>();
    const handleCardPress = (item: ChildsRegistrationform) => {
        setSelectedItem(item);
        setIsModalSheetOpen(true);
        console.log(selectedItem, isModalOpen);

    };
    const closeModal = () => {
        setIsModalSheetOpen(false);
        setSelectedItem(undefined)
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
    useFocusEffect(
        React.useCallback(() => {
        
          console.log( DataArry);
        }, [DataArry])
      );
    return (
        <Conteiner>
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Excluir esse agendamento!"

                contentStyle={{ width: 300, height: 100, }}
                closeOnTouchOutside={true}
                titleStyle={{ fontSize: 22, textAlign: 'center', color: thema.colors.pink }}
                messageStyle={{ fontSize: 20, color: thema.colors.pink }}
                closeOnHardwareBackPress={false}
                cancelButtonStyle={{ width: 100, alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: thema.colors.pink, }}
                confirmButtonStyle={{ width: 100, alignItems: 'center', marginLeft: 25, }}
                cancelButtonTextStyle={{ color: thema.colors.white }}
                showCancelButton={true}
                showConfirmButton={true}
                confirmText="Sim"
                confirmButtonColor={thema.colors.pink}
                onConfirmPressed={() => {
                    hideAlertHandler();
                    selectedItem?.id && deleteData(selectedItem.id);
                    closeModal();
                }}
                cancelText="Não"
                cancelButtonColor={thema.colors.pink}
                onCancelPressed={hideAlertHandler}
            />
            <Logo source={require('../../../assets/logo.png')} />
            <Title>Horários agendados</Title>
            <ConteinerCard >
                <FlatList
                    data={fakeDataArray}
                    keyExtractor={(item: ChildsRegistrationform) => (item.id ? item.id.toString() : 'unique-key')}
                    renderItem={({item}) => <CardChild age={item?.DateOfBirth} avatar={item.avatar} childGender={item.ChildGender} date={item.date} name={item.nameChild}  onCardPress={()=>handleCardPress(item)}/>}
                />
            </ConteinerCard>
            <Modal
                animationType="slide"
                transparent={false}
                visible={isModalOpen}
                onRequestClose={closeModal}
            >
                 <ModalObs
                   child={selectedItem}
                    isVisible={false}
                    onHide={closeModal}
                   
                    deleteTime={showAlertHandler}
                /> 
            </Modal>
        </Conteiner>
    );
}

