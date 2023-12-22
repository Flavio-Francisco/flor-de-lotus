import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { ButtomSubmit, Conteiner,Logo ,ConteinerdDateMoney, Input, InputDate, InputMoney, InputNote, Label, TextSubmit } from "./style";
import { View } from "react-native";
import { thema } from "../../../thema";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/Agenda";
import AwesomeAlert from "react-native-awesome-alerts";
import React from "react";

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
        .label('date')
        .test('isValidDate', 'Data inválida. Por favor, use DD/MM/YYYY.', function (value) {
            if (!value) return true; // Permite campo vazio
            const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
            return regex.test(value);
        }),

});
export default function Add() {
    const { navigate } = useNavigation();
    const FormValues: MyFormValues = { name: '', date: '', procedure: '', money: '', note: '' };
    const { create } = useContext(AuthContext);
    const [showAlert, setShowAlert] = useState<boolean>(false);

   
    const hideAlertHandler = () => {
        setShowAlert(false);
    };
    return (
        <>
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Atualizar Dados?"

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
                onConfirmPressed={hideAlertHandler}
                cancelText="Não"
                cancelButtonColor={thema.colors.pink}
                onCancelPressed={hideAlertHandler}
            />
            <Formik
                initialValues={FormValues}
                onSubmit={values => {
                    console.log(values);
                    create(values)
                    navigate('Home')
                }

                }
                validationSchema={validationSchema}
            >
                {({ handleChange, handleSubmit, handleBlur, values }) => (
                    <Conteiner>
                        <Logo source={require('../../../assets/logo.png')} />
                        <ConteinerdDateMoney>
                            <View style={{ width: '50%' }}>
                                <Label>Data</Label>
                                <InputDate
                                    value={values.date}
                                    placeholder="digite a data"
                                    onChangeText={(text) => {
                                        const numericValue = text.replace(/[^\d]/g, '');
                                        if (numericValue.length <= 8) {
                                            const formattedValue = numericValue
                                                .replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
                                                .replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
                                            handleChange('date')(formattedValue);
                                        }
                                    }}
                                    onBlur={handleBlur('date')}
                                    placeholderTextColor={thema.colors.pinkOpacidy}
                                />
                            </View>
                            <View style={{ width: '50%' }}>
                                <Label>Valor</Label>
                                <InputMoney
                                    value={values.money}
                                    placeholder="digite o valor"
                                    onChangeText={(text) => {
                                        const numericValue = text.replace(/[^\d]/g, '');
                                        const floatValue = numericValue ? parseInt(numericValue) / 100 : 0;
                                        const formattedValue = floatValue.toLocaleString('pt-BR', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                            style: 'currency',
                                            currency: 'BRL',
                                        });
                                        handleChange('money')(formattedValue);
                                    }}
                                    onBlur={handleBlur('money')}
                                    placeholderTextColor={thema.colors.pinkOpacidy}
                                />
                            </View>

                        </ConteinerdDateMoney>
                        <View style={{ width: '96%', marginLeft: 20, marginTop: 10, elevation: 5, }}>
                            <Label>Nome</Label>
                            <Input
                                value={values.name}
                                placeholder="nome do cliente (a)"
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                placeholderTextColor={thema.colors.pinkOpacidy} />
                        </View>
                        <View style={{ width: '96%', marginLeft: 20, marginTop: 10 }}>
                            <Label>Procedimento</Label>
                            <Input
                                value={values.procedure}
                                placeholder="digite o procedimento a ser realizado"
                                onChangeText={handleChange('procedure')}
                                onBlur={handleBlur('procedure')}
                                placeholderTextColor={thema.colors.pinkOpacidy} />
                        </View>
                        <View style={{ width: '96%', marginLeft: 20, marginTop: 10 }}>
                            <Label>Observações</Label>
                            <InputNote
                                value={values.note}
                                placeholder="digite Observações do cliente (a)"
                                onChangeText={handleChange('note')}
                                onBlur={handleBlur('note')}
                                multiline
                                numberOfLines={10}
                                placeholderTextColor={thema.colors.pinkOpacidy} />
                        </View>
                        <ButtomSubmit onPress={() => handleSubmit()}>
                            <TextSubmit >Cadastrar</TextSubmit>
                        </ButtomSubmit>

                    </Conteiner>
                )}
            </Formik>
        </>
    );
}