import React, { useState, useEffect, useContext } from "react";
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
    TextCheck,
    TextData,
    TextDataObs,
    Title,
} from "./styles";
import { ChildsRegistrationform } from "../../utils/Models";
import { colorChold, thema } from "../../../thema";
import { Check, calcularIdade, formatarTelefone } from "../../utils/Function";
import { View } from "react-native";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/Agenda";

interface Ipros {
    isVisible: boolean;
    onHide: () => void;
    deleteTime: () => void;
    child: ChildsRegistrationform ;
    salve:(child: ChildsRegistrationform )=>void;
}

export default function ModalObs({
    deleteTime,
    onHide,
    child,
    salve
}: Ipros) {


    const [isChecked, setChecked] = useState(Check(child?.ChildInformation.allergy));
    const [isCheckedhealth, setCheckedhealth] = useState(Check(child?.ChildInformation.HealthInsurance));
    const [daily, setDaily] = useState(Check(child?.ImportantInformation.Daily));
    const [overnight, setOvernight] = useState(Check(child?.ImportantInformation.overnight));
    const [travel, setTravel] = useState(Check(child?.ImportantInformation.travel));
    const [stroll, setStroll] = useState(Check(child?.ImportantInformation.stroll));

   
    const { navigate } = useNavigation();
    

    const hideModalHandler = () => {
        onHide();
    };
    const ModalHandlerDelete = () => {
        deleteTime();
    };

    const handleRegister = ()=>{

        navigate('Register')
    }

    return (
        <>

            <Title style={{ color: colorChold(child?.ChildGender) }}>Dados da criança</Title>
            <ConteinerModal style={{ borderColor: colorChold(child?.ChildGender) }}>
                <ConteinerData>
                    <TextData style={{ color: colorChold(child?.ChildGender) }}>Nome: </TextData>
                    <Data style={{ color: colorChold(child?.ChildGender) }}>{child?.nameChild}</Data>
                </ConteinerData>
                <ConteinerData>
                    <TextData style={{ color: colorChold(child?.ChildGender) }}>Data de nascimento: </TextData>
                    <Data style={{ color: colorChold(child?.ChildGender) }}> {child?.DateOfBirth}</Data>
                </ConteinerData>

                <ConteinerData>
                    <TextData style={{ color: colorChold(child?.ChildGender) }}>Mãe: </TextData>
                    <Data style={{ color: colorChold(child?.ChildGender) }}>{child?.nameMother}</Data>
                </ConteinerData>
                <ConteinerData>
                    <TextData style={{ color: colorChold(child?.ChildGender) }}>Pai: </TextData>
                    <Data style={{ color: colorChold(child?.ChildGender) }}>{child?.nameFather}</Data>
                </ConteinerData >
                <ConteinerData>
                    <TextData style={{ color: colorChold(child?.ChildGender) }}>Telefone: </TextData>
                    <Data style={{ color: colorChold(child?.ChildGender) }}>{formatarTelefone(child?.phone)}</Data>
                </ConteinerData >

                <TextDataObs style={{ color: colorChold(child?.ChildGender) }}>Endereço: </TextDataObs>

                <ConteinerData2 style={{ borderColor: colorChold(child?.ChildGender) }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TextData style={{ color: colorChold(child?.ChildGender), fontSize: 16 }}>Rua: </TextData>
                        <Data style={{ color: colorChold(child?.ChildGender), fontSize: 16 }}> {child?.Address.street} </Data>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 10, marginTop: 5 }}>
                        <View style={{ flexDirection: 'row'  }}>
                            <TextData style={{ color: colorChold(child?.ChildGender), fontSize: 16 ,}}>Bairro:</TextData>
                            <Data style={{ color: colorChold(child?.ChildGender), fontSize: 16 }}>{child?.Address.Neighborhood} </Data>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 0,marginLeft: 35 }}>
                            <TextData style={{ color: colorChold(child?.ChildGender), fontSize: 16 }}>nº:</TextData>
                            <Data style={{ color: colorChold(child?.ChildGender), fontSize: 16 }}> {child?.Address.number} </Data>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TextData style={{ color: colorChold(child?.ChildGender), fontSize: 16 }}>Cidade: </TextData>
                        <Data style={{ color: colorChold(child?.ChildGender), fontSize: 16 }}> {child?.Address.city} </Data>
                    </View>
                </ConteinerData2>

                <TextDataObs style={{ color: colorChold(child?.ChildGender) }}>Informações da Criança: </TextDataObs>

                <ConteinerData2 style={{ borderColor: colorChold(child?.ChildGender) }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TextData style={{ color: colorChold(child?.ChildGender), fontSize: 16 }}>Possui alguma alergia:  </TextData>

                        <View style={{ flexDirection: 'row', gap: 3 }}>
                            <TextCheck style={{ color: colorChold(child?.ChildGender) }}>sim</TextCheck>
                            <Checkbox
                                style={{ borderColor: colorChold(child?.ChildGender), marginLeft: 1, marginRight: 10, borderRadius: 5 }}
                                value={isChecked}
                                onValueChange={setChecked}
                                color={isChecked ? colorChold(child?.ChildGender) : undefined}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', gap: 3 }}>
                            <TextCheck style={{ color: colorChold(child?.ChildGender) }}>não</TextCheck>
                            <Checkbox
                                style={{ borderColor: colorChold(child?.ChildGender), marginLeft: 1, borderRadius: 5 }}
                                value={!isChecked}
                                onValueChange={setChecked}
                                color={!isChecked ? colorChold(child?.ChildGender) : undefined}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TextData style={{ color: colorChold(child?.ChildGender), fontSize: 16 }}>Se sim qual?: </TextData>
                            <Data style={{ color: colorChold(child?.ChildGender), fontSize: 16 }}>{child?.ChildInformation.WhichAllergy} </Data>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <TextData style={{ color: colorChold(child?.ChildGender), fontSize: 16 }}>Possui plano de saúde:  </TextData>

                        <View style={{ flexDirection: 'row', gap: 3 }}>
                            <TextCheck style={{ color: colorChold(child?.ChildGender) }}>sim</TextCheck>
                            <Checkbox
                                style={{ borderColor: colorChold(child?.ChildGender), marginLeft: 1, marginRight: 10, borderRadius: 5 }}
                                value={isCheckedhealth}
                                onValueChange={setCheckedhealth}
                                color={isCheckedhealth ? colorChold(child?.ChildGender) : undefined}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', gap: 3 }}>
                            <TextCheck style={{ color: colorChold(child?.ChildGender) }}>não</TextCheck>
                            <Checkbox
                                style={{ borderColor: colorChold(child?.ChildGender), marginLeft: 1, borderRadius: 5 }}
                                value={!isCheckedhealth}
                                onValueChange={setCheckedhealth}
                                color={!isCheckedhealth ? colorChold(child?.ChildGender) : undefined}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TextData style={{ color: colorChold(child?.ChildGender), fontSize: 16 }}>Se sim qual?: </TextData>
                            <Data style={{ color: colorChold(child?.ChildGender), fontSize: 16 }}>{child?.ChildInformation.WhichHealthInsurance} </Data>
                        </View>

                    </View>


                </ConteinerData2>
                <TextDataObs style={{ color: colorChold(child?.ChildGender) }}>Informações importantes: </TextDataObs>

                <ConteinerData2 style={{ borderColor: colorChold(child?.ChildGender), gap: 10 }}>
                    <View style={{ flexDirection: 'row', gap: 3 }}>
                        <TextCheck style={{ color: colorChold(child?.ChildGender) }}>Diária</TextCheck>
                        <Checkbox
                            style={{ borderColor: colorChold(child?.ChildGender), marginLeft: 1, marginRight: 5, borderRadius: 5 }}
                            value={daily}
                            onValueChange={setDaily}
                            color={daily ? colorChold(child?.ChildGender) : undefined}
                        />
                        <TextCheck style={{ color: colorChold(child?.ChildGender) }}>R$: {child?.ImportantInformation.WhichDaily}</TextCheck>

                    </View>
                    <View style={{ flexDirection: 'row', gap: 3 }}>
                        <TextCheck style={{ color: colorChold(child?.ChildGender) }}>Pernoite</TextCheck>
                        <Checkbox
                            style={{ borderColor: colorChold(child?.ChildGender), marginLeft: 1, marginRight: 5, borderRadius: 5 }}
                            value={overnight}
                            onValueChange={setOvernight}
                            color={overnight ? colorChold(child?.ChildGender) : undefined}
                        />
                        <TextCheck style={{ color: colorChold(child?.ChildGender) }}>R$: {child?.ImportantInformation.WhichOvernight}</TextCheck>

                    </View>
                    <View style={{ flexDirection: 'row', gap: 3 }}>
                        <TextCheck style={{ color: colorChold(child?.ChildGender) }}>Viagens</TextCheck>
                        <Checkbox
                            style={{ borderColor: colorChold(child?.ChildGender), marginLeft: 1, marginRight: 5, borderRadius: 5 }}
                            value={travel}
                            onValueChange={setTravel}
                            color={travel ? colorChold(child?.ChildGender) : undefined}
                        />
                        <TextCheck style={{ color: colorChold(child?.ChildGender) }}>R$: {child?.ImportantInformation.WhichTravel}</TextCheck>

                    </View>
                    <View style={{ flexDirection: 'row', gap: 3 }}>
                        <TextCheck style={{ color: colorChold(child?.ChildGender) }}>Passei</TextCheck>
                        <Checkbox
                            style={{ borderColor: colorChold(child?.ChildGender), marginLeft: 1, marginRight: 5, borderRadius: 5 }}
                            value={stroll}
                            onValueChange={setStroll}
                            color={stroll ? colorChold(child?.ChildGender) : undefined}
                        />
                        <TextCheck style={{ color: colorChold(child?.ChildGender) }}>R$: {child?.ImportantInformation.WhichStroll}</TextCheck>

                    </View>

                </ConteinerData2>

            </ConteinerModal>
            <ConteinerButtom>
                <ButtomModal onPress={hideModalHandler} style={{ borderColor: colorChold(child?.ChildGender) }}>
                    <TextButtom style={{ color: colorChold(child?.ChildGender) }}>Fechar</TextButtom>
                </ButtomModal>
                <ButtomModal onPress={() => {
                    salve(child);
                    handleRegister()}} style={{ backgroundColor: 'green', borderColor: thema.colors.white }}>
                    <TextButtom>Salvar</TextButtom>
                </ButtomModal>
                <ButtomModalDelete onPress={ModalHandlerDelete} style={{ backgroundColor: 'red', borderColor: thema.colors.white }}>
                    <AntDesign name="delete" size={20} color={thema.colors.white} />
                    <TextButtom>Excluir</TextButtom>
                </ButtomModalDelete>
            </ConteinerButtom>

        </>
    );
}