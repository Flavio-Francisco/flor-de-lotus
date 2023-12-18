import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { AgendaProps } from "../../utils/Models";
import { Conteiner, ConteinerCard, Logo, Title } from "./styles";
import { FlatList, Modal } from "react-native";
import CardList from "../../components/CardList";
import CardUpdate from "../../components/CardUpdate";

interface MyFormValues {
    date: string;
    name: string;
    procedure: string;
    money?: string;
    note?: string;

}

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .label('name'),

    date: Yup.string()
        .label('date'),

    procedure: Yup.string()
        .label('procedure'),

    money: Yup.string()
        .label('procedure'),
    note: Yup.string()
        .label('note'),


});
export default function Update() {
    const navigation = useNavigation();
    const FormValues: MyFormValues = { name: '', date: '', procedure: '', money: '' ,note: ''};
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
            <Title>Atualizar agendamento</Title>
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
                <CardUpdate
                    date={selectedItem?.date}
                    name={selectedItem?.name}
                    procedure={selectedItem?.procedure}
                    money={selectedItem?.money}
                    note={selectedItem?.note}
                    closeModal={closeModal}
               
                />
            </Modal>
            </Conteiner>
    );
}

