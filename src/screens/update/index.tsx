
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { AgendaProps, ChildsRegistrationform } from "../../utils/Models";
import { Conteiner, ConteinerCard, Logo, Title } from "./styles";
import { FlatList, Modal } from "react-native";
import CardList from "../../components/CardList";
import { AuthContext } from "../../context/Agenda";
import AwesomeAlert from "react-native-awesome-alerts";
import { colorChold, thema } from "../../../thema";
import React from "react";
import CardChild from "../../components/CardChild";
import UpdateAvatar from "../../components/UpdateAvatar";




export default function Update() {

    const [isModalOpen, setIsModalSheetOpen] = useState(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const { DataArry, updateData } = useContext(AuthContext);
    const [confirm, setConfirm] = useState<boolean>(false);
    const navigation = useNavigation();
    const showAlertHandler = () => {
        setShowAlert(true);
    };
    const handleNavigate = () => {
        navigation.navigate('Home')
        setConfirm(false)
    }

    const [selectedItem, setSelectedItem] = useState<ChildsRegistrationform>();
    const handleCardPress = (item: ChildsRegistrationform |undefined) => {
        setSelectedItem(item);
        setIsModalSheetOpen(true);
        console.log(selectedItem);

    };
    const closeModal = () => {
        setIsModalSheetOpen(false);
        setConfirm(true)
    }
    useEffect(() => {
        selectedItem
    }, [handleCardPress])

    return (
        <Conteiner>
            <AwesomeAlert
                show={confirm}
                showProgress={false}
                title="foto atualizada com sucesso!!"
                contentStyle={{ width: 300, height: 100, }}
                closeOnTouchOutside={true}
                titleStyle={{ fontSize: 22, textAlign: 'center', color:  colorChold(selectedItem?.ChildGender) }}
                messageStyle={{ fontSize: 20, color:  colorChold(selectedItem?.ChildGender) }}
                closeOnHardwareBackPress={false}
                cancelButtonStyle={{ width: 100, alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: colorChold(selectedItem?.ChildGender), }}
                confirmButtonStyle={{ width: 100, alignItems: 'center', marginLeft: 25, }}
                cancelButtonTextStyle={{ color: colorChold(selectedItem?.ChildGender)}}
                showConfirmButton={true}
                confirmText="OK"
                confirmButtonColor={ colorChold(selectedItem?.ChildGender)}
                onConfirmPressed={handleNavigate}

            />

            <Logo source={require('../../../assets/logo.png')} />
            <Title>Atualizar foto</Title>
            <ConteinerCard >
                <FlatList
                    data={DataArry}
                    keyExtractor={(item: ChildsRegistrationform) => (item.id ? item.id.toString() : 'unique-key')}
                    renderItem={items => <CardChild name={items.item.nameChild} date={items.item.date} childGender={items.item.ChildGender} avatar={items.item.avatar} onCardPress={() => handleCardPress(items.item)} age={items.item.DateOfBirth} />}
                />
            </ConteinerCard>
            <Modal
                animationType="slide"
                transparent={false}
                visible={isModalOpen}
                onRequestClose={closeModal}
            >
                <UpdateAvatar
                    props={selectedItem}  
                    closeModal={closeModal}
                    />

            </Modal>
        </Conteiner>
    );
}

