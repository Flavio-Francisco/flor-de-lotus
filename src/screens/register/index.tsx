
import React, { useContext, useEffect, useState } from 'react';

import { Conteiner, ConteinerCard, Logo, Name, } from './styles';
import { FlatList } from 'react-native-gesture-handler';
import CardList from '../../components/CardList';

import { AgendaProps, ChildsRegistrationform } from '../../utils/Models';
import { Modal } from 'react-native';
import { Title } from '../update/styles';
import AwesomeAlert from 'react-native-awesome-alerts';
import { colorChold, thema } from '../../../thema';
import { AuthContext } from '../../context/Agenda';
import { useFocusEffect } from '@react-navigation/native';
import CardChild from '../../components/CardChild';
import ModalRegister from '../../components/ModalRegister';
import CardForm from '../../components/CardForm';




export default function Register() {
    const [isModalOpen, setIsModalSheetOpen] = useState(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [isModalOpen2, setIsModalSheetOpen2] = useState(false);
    const [showAler2, setShowAlert2] = useState<boolean>(false);
    const { deleteDataList, records } = useContext(AuthContext);
    const showAlertHandler = () => {
        setShowAlert(true);

    };

    const hideAlertHandler = () => {
        setShowAlert(false);
    };


    const [selectedItem, setSelectedItem] = useState<ChildsRegistrationform | undefined>();
    const handleCardPress = (item: ChildsRegistrationform | undefined) => {
        setSelectedItem(item);
        setIsModalSheetOpen(true);
        console.log(selectedItem, isModalOpen);

    };
    const openModal = () => {
        closeModal()
        setShowAlert2(true)
        setShowAlert(false)
    }
    const closeModal = () => {
        setIsModalSheetOpen(false);

        // Abrir o segundo modal quando o primeiro modal for fechado
        setIsModalSheetOpen2(true);
    };
    const closeModal2 = () => {
        setIsModalSheetOpen2(false);
        setSelectedItem(undefined)
    }




    useFocusEffect(
        React.useCallback(() => {

            console.log(records);
        }, [])
    );
    return (
        <Conteiner>
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Excluir esse agendamento!"

                contentStyle={{ width: 300, height: 100, }}
                closeOnTouchOutside={true}
                titleStyle={{ fontSize: 22, textAlign: 'center', color: colorChold(selectedItem?.ChildGender) }}
                messageStyle={{ fontSize: 20, color: colorChold(selectedItem?.ChildGender) }}
                closeOnHardwareBackPress={false}
                cancelButtonStyle={{ width: 100, alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: colorChold(selectedItem?.ChildGender), }}
                confirmButtonStyle={{ width: 100, alignItems: 'center', marginLeft: 25, }}
                cancelButtonTextStyle={{ color: thema.colors.white }}
                showCancelButton={true}
                showConfirmButton={true}
                confirmText="Sim"
                confirmButtonColor={colorChold(selectedItem?.ChildGender)}
                onConfirmPressed={() => {
                    hideAlertHandler();
                    selectedItem?.id && deleteDataList(selectedItem.id);
                    setIsModalSheetOpen2(false);
                    setIsModalSheetOpen(false);
                    setShowAlert(false);
                }}
                cancelText="Não"
                cancelButtonColor={colorChold(selectedItem?.ChildGender)}
                onCancelPressed={hideAlertHandler}
            />
            <Logo source={require('../../../assets/logo.png')} />
            <Title>Lista de crianças</Title>
            <ConteinerCard >
                <FlatList
                    data={records}
                    keyExtractor={(item: ChildsRegistrationform) => (item.id ? item.id.toString() : 'unique-key')}
                    renderItem={({ item }) => <CardChild age={item?.DateOfBirth} avatar={item.avatar} childGender={item.ChildGender} date={item.date} name={item.nameChild} onCardPress={() => handleCardPress(item)} />}
                />
            </ConteinerCard>
            <Modal

                animationType="fade"
                aria-checked
                transparent={false}
                visible={isModalOpen}
                onRequestClose={closeModal}


            >
                <ModalRegister
                    child={selectedItem}
                    isVisible={false}
                    close={() => setIsModalSheetOpen(false)}
                    deleteTime={showAlertHandler}
                    salve={openModal} />
            </Modal>
            <Modal
                animationType="slide"
                transparent={false}
                visible={isModalOpen2}
                onRequestClose={closeModal2}
            >
                <CardForm

                    props={selectedItem}
                    closeModal={closeModal2}

                />
            </Modal>
        </Conteiner>
    );
}

