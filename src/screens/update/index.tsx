
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { AgendaProps } from "../../utils/Models";
import { Conteiner, ConteinerCard, Logo, Title } from "./styles";
import { FlatList, Modal } from "react-native";
import CardList from "../../components/CardList";
import CardUpdate from "../../components/CardUpdate";
import { AuthContext } from "../../context/Agenda";
import AwesomeAlert from "react-native-awesome-alerts";
import { thema } from "../../../thema";




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

    const [selectedItem, setSelectedItem] = useState<AgendaProps>();
    const handleCardPress = (item: AgendaProps) => {
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
                title="Agendamento atualizado com sucesso!!"
                contentStyle={{ width: 300, height: 100, }}
                closeOnTouchOutside={true}
                titleStyle={{ fontSize: 22, textAlign: 'center', color: thema.colors.pink }}
                messageStyle={{ fontSize: 20, color: thema.colors.pink }}
                closeOnHardwareBackPress={false}
                cancelButtonStyle={{ width: 100, alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: thema.colors.pink, }}
                confirmButtonStyle={{ width: 100, alignItems: 'center', marginLeft: 25, }}
                cancelButtonTextStyle={{ color: thema.colors.white }}
                showConfirmButton={true}
                confirmText="OK"
                confirmButtonColor={thema.colors.pink}
                onConfirmPressed={handleNavigate}

            />
        
            <Logo source={require('../../../assets/logo.webp')} />
            <Title>Atualizar agendamento</Title>
            <ConteinerCard >
                <FlatList
                    data={DataArry}
                    keyExtractor={(item: AgendaProps) => (item.id ? item.id.toString() : 'unique-key')}
                    renderItem={items => <CardList name={items.item.name} date={items.item.date} procedure={items.item.procedure} onCardPress={() => handleCardPress(items.item)} />}
                />
            </ConteinerCard>
            <Modal
                animationType="slide"
                transparent={false}
                visible={isModalOpen}
                onRequestClose={closeModal}
            >
                <CardUpdate
                    date={selectedItem?.date}
                    name={selectedItem?.name}
                    procedure={selectedItem?.procedure}
                    money={selectedItem?.money}
                    note={selectedItem?.note}
                    id={selectedItem?.id}
                    closeModal={closeModal}
                    isOpenAlert={showAlertHandler}
                    isVisible={showAlert}
                />
            </Modal>
        </Conteiner>
    );
}

