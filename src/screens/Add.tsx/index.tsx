import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { ButtomSubmit, Conteiner, Logo, ConteinerdDateMoney, Input, InputDate, InputMoney, InputNote, Label, TextSubmit, Title, TextCheck, InputChek } from "./style";
import { Switch, View } from "react-native";
import { thema } from "../../../thema";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/Agenda";
import AwesomeAlert from "react-native-awesome-alerts";
import React from "react";
import { ChildsRegistrationform } from "../../utils/Models";
import Checkbox from "expo-checkbox";
import { RadioButton } from 'react-native-paper';
import { z } from "zod";

interface MyFormValues {
    date: string | undefined;
    avatar: string;
    ChildGender: boolean;
    dateOfBirth: string;
    nameChild: string | undefined;
    nameMother: string | undefined;
    nameFather: string | undefined;
    phone: string | undefined;

    street: string | undefined;
    number: number | undefined;
    Neighborhood: string | undefined;
    city: string | undefined;


    allergy: boolean | undefined;
    WhichAllergy: string | undefined;
    DietaryRestriction: boolean | undefined;
    WhichDietaryRestriction: string | undefined;
    drug: boolean | undefined;
    WhichDrug: string | undefined;
    HealthInsurance: boolean | undefined;
    WhichHealthInsurance: string | undefined;
    MarmosetType: string | undefined;


    Daily: boolean | undefined;
    WhichDaily: string | undefined;
    overnight: boolean | undefined;
    WhichOvernight: string | undefined;
    travel: boolean | undefined;
    WhichTravel: string | undefined;
    stroll: boolean | undefined;
    WhichStroll: string | undefined;

}
//.optional() não obrigatorio
const MyFormValues = z.object({
    date: z.string().refine(value => !value || /^\d{2}\/\d{2}\/\d{4}$/.test(value), {
      message: 'Data inválida. Por favor, use DD/MM/YYYY.',
    }),
    avatar: z.string().optional(),
    ChildGender: z.boolean().refine(value => value !== undefined, { message: 'Gênero da criança é obrigatório' }),
    DateOfBirth: z.string().refine(value => !value || /^\d{2}\/\d{2}\/\d{4}$/.test(value), {
      message: 'Data inválida de nascimento. Por favor, use DD/MM/YYYY.',
    }),
    nameChild: z.string().min(1, { message: 'Nome da criança é obrigatório' }),
    nameMother: z.string().min(1, { message: 'Nome da mãe é obrigatório' }),
    nameFather: z.string().min(1, { message: 'Nome do pai é obrigatório' }),
    phone: z.string().refine(value => !value || /^\d{10}$/.test(value), {
      message: 'Formato de telefone inválido (apenas números)',
    }),
    Address: z.object({
      street: z.string().min(1, { message: 'Nome da rua é obrigatório' }),
      number: z.number().refine(value => value !== undefined, { message: 'Número é obrigatório' }),
      Neighborhood: z.string().min(1, { message: 'Nome do bairro é obrigatório' }),
      city: z.string().min(1, { message: 'Nome da cidade é obrigatório' }),
    }),
    ChildInformation: z.object({
      allergy: z.boolean(),
      WhichAllergy: z.string().refine(()=>(value: string | any[], data: { allergy: any; }) => !data.allergy || (value && value.length > 0), {
        message: 'Alergia é obrigatória quando há alergia.',
      }),
      DietaryRestriction: z.boolean(),
      WhichDietaryRestriction: z.string().refine(()=>(value: string | any[], data: { DietaryRestriction: any; }) => !data.DietaryRestriction || (value && value.length > 0),
        { message: 'Restrição alimentar é obrigatória quando há restrição alimentar.' }
      ),
    //  drug: z.boolean(),
      WhichDrug: z.string().optional(),
      HealthInsurance: z.boolean().optional(),
      WhichHealthInsurance: z.string().refine(()=>(value: string | any[], data: { HealthInsurance: any; }) => !data.HealthInsurance || (value && value.length > 0),
        { message: 'Plano de saúde é obrigatório quando há plano de saúde.' }
      ),
     // MarmosetType: z.string().min(1, { message: 'Tipo sanguíneo é obrigatório' }),
    }),
    ImportantInformation: z.object({
      Daily: z.boolean(),
      WhichDaily: z.string().refine(()=>(value: string | any[], data: { Daily: any; }) => !data.Daily || (value && value.length > 0), {
        message: 'Valor diário é obrigatório quando há diária.',
      }),
      overnight: z.boolean(),
      WhichOvernight: z.string().refine(()=>(value: string | any[], data: { overnight: any; }) => !data.overnight || (value && value.length > 0), {
        message: 'Valor pernoite é obrigatório quando há pernoite.',
      }),
      travel: z.boolean(),
      WhichTravel: z.string().refine(()=>(value: string | any[], data: { travel: any; }) => !data.travel || (value && value.length > 0), {
        message: 'Valor viagem é obrigatório quando há viagem.',
      }),
      stroll: z.boolean(),
      WhichStroll: z.string().refine(()=>(value: string | any[], data: { stroll: any; }) => !data.stroll || (value && value.length > 0), {
        message: 'Valor passeio é obrigatório quando há passeio.',
      }),
    }),
  });
export default function Add() {
    const { navigate } = useNavigation();


    const FormValues: ChildsRegistrationform = {
        date: undefined,
        avatar: "",
        ChildGender: false,
        DateOfBirth: "",
        nameChild: undefined,
        nameMother: undefined,
        nameFather: undefined,
        phone: undefined,
        Address: {
            street: undefined,
            number: undefined,
            Neighborhood: undefined,
            city: undefined
        },
        ChildInformation: {
            allergy: false,
            WhichAllergy: undefined,
            DietaryRestriction: false,
            WhichDietaryRestriction: undefined,
            drug: false,
            WhichDrug: undefined,
            HealthInsurance: false,
            WhichHealthInsurance: undefined,
            MarmosetType: undefined
        },
        ImportantInformation: {
            Daily: undefined,
            WhichDaily: undefined,
            overnight: undefined,
            WhichOvernight: undefined,
            travel: undefined,
            WhichTravel: undefined,
            stroll: undefined,
            WhichStroll: undefined
        }
    };




    const { create } = useContext(AuthContext);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [dietaryRestriction, setDietaryRestriction] = useState(!FormValues.ChildInformation.DietaryRestriction);
    const [stroll, setStroll] = useState(FormValues.ImportantInformation.stroll);
    const [allergy, setAllergy] = useState(!FormValues.ChildInformation.allergy);
    const [health, setHealth] = useState(!FormValues.ChildInformation.HealthInsurance);
    const [daily, setDaily] = useState(FormValues.ImportantInformation.Daily);
    const [overnight, setOvernight] = useState(FormValues.ImportantInformation.overnight);
    const [travel, setTravel] = useState(FormValues.ImportantInformation.travel);
    const hideAlertHandler = () => {
        setShowAlert(false);
    };
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Logo source={require('../../../assets/logo.png')} />
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
                onSubmit={async values => {
                    
                    try {
                      const data = await MyFormValues.parse(values)
                         console.log(data);
                    } catch (error) {
                        console.log(error);

                    }



                }

                }
          //   validationSchema={MyFormValues}
            >
                {({ handleChange, handleSubmit, handleBlur, values }) => (
                    <Conteiner>

                        <ConteinerdDateMoney>
                            <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                                <View style={{ width: '50%', marginLeft: 9 }}>
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
                                        onBlur={() => handleBlur('date')}
                                        placeholderTextColor={thema.colors.pinkOpacidy}
                                    />
                                </View>
                                <View style={{ width: '50%', marginLeft: 7 }}>
                                    <Label>Data de nascimento</Label>
                                    <InputDate
                                        value={values.DateOfBirth}
                                        placeholder="digite a data de nascimento"
                                        onChangeText={(text) => {
                                            const numericValue = text.replace(/[^\d]/g, '');
                                            if (numericValue.length <= 8) {
                                                const formattedValue = numericValue
                                                    .replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
                                                    .replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
                                                handleChange('DateOfBirth')(formattedValue);
                                            }
                                        }}
                                        onBlur={() => handleBlur('DateOfBirth')}
                                        placeholderTextColor={thema.colors.pinkOpacidy}
                                    />
                                </View>
                            </View>



                        </ConteinerdDateMoney>
                        <View style={{ width: '96%', marginLeft: 20, marginTop: 10, elevation: 5, }}>
                            <Label>Nome da criança</Label>
                            <Input
                                value={values.nameChild}
                                placeholder="digite o nome da criança"
                                onChangeText={handleChange('nameChild')}
                                onBlur={handleBlur('nameChild')}
                                placeholderTextColor={thema.colors.pinkOpacidy} />
                        </View>
                        <View style={{ width: '96%', marginLeft: 20, marginTop: 10 }}>
                            <Label>Nome da mãe</Label>
                            <Input
                                value={values.nameMother}
                                placeholder="digite o nome da mãe"
                                onChangeText={handleChange('nameMother')}
                                onBlur={handleBlur('nameMother')}
                                placeholderTextColor={thema.colors.pinkOpacidy} />
                        </View>
                        <View style={{ width: '96%', marginLeft: 20, marginTop: 10 }}>
                            <Label>Nome do pai</Label>
                            <Input
                                value={values.nameFather}
                                placeholder="digite o nome do pai"
                                onChangeText={handleChange('nameFather')}
                                onBlur={handleBlur('nameFather')}

                                placeholderTextColor={thema.colors.pinkOpacidy} />
                        </View>
                        <View style={{ width: '96%', marginLeft: 20, marginTop: 10 }}>
                            <Label>Telefone para contato</Label>
                            <Input
                                value={values.phone}
                                placeholder="digite o número de telefone"
                                onChangeText={handleChange('phone')}
                                onBlur={handleBlur('phone')}

                                placeholderTextColor={thema.colors.pinkOpacidy} />
                        </View>
                        <Title>Endereço</Title>

                        <View style={{ borderWidth: 1, borderColor: thema.colors.pink, borderRadius: 5, width: '90%', paddingBottom: 20, padding: 20, marginLeft: 16, }}>
                            <Label>Rua:</Label>
                            <Input
                                value={values.Address.street}
                                placeholder="digite o nome da rua"
                                onChangeText={handleChange('Address.street')}
                                onBlur={handleBlur('Address.street')}
                                placeholderTextColor={thema.colors.pinkOpacidy} />
                            <View style={{ flexDirection: 'row', marginBottom: 16, justifyContent: 'space-between' }}>
                                <View>
                                    <Label>Bairro:</Label>
                                    <Input
                                        style={{ width: '100%' }}
                                        value={values.Address.Neighborhood}
                                        placeholder="digite o bairro"
                                        onChangeText={handleChange('Address.Neighborhood')}
                                        onBlur={handleBlur('Address.Neighborhood')}
                                        placeholderTextColor={thema.colors.pinkOpacidy} />
                                </View>
                                <View style={{ marginRight: 70, width: '40%' }}>
                                    <Label>Nº:</Label>
                                    <Input
                                        style={{ width: '80%' }}
                                        value={values.Address.number !== undefined ? values.Address.number.toString() : ''}
                                        placeholder="Nº"
                                        onChangeText={handleChange('Address.number')}
                                        onBlur={handleBlur('Address.number')}
                                        placeholderTextColor={thema.colors.pinkOpacidy} />
                                </View>
                            </View>
                            <Label>Cidade:</Label>
                            <Input
                                value={values.Address.city}
                                placeholder="digite o nome da cidade"
                                onChangeText={handleChange('Address.city')}
                                onBlur={handleBlur('Address.city')}
                                placeholderTextColor={thema.colors.pinkOpacidy} />
                        </View>


                        <Title>Informação da criança</Title>
                        <View style={{ borderWidth: 1, borderColor: thema.colors.pink, borderRadius: 5, width: '90%', paddingBottom: 20, padding: 20, marginLeft: 16, }}>
                            <View style={{ flexDirection: 'row', gap: 3, marginBottom: 16, }}>
                                <Label>Possui alguma alergia?:  </Label>
                                <TextCheck style={{ color: thema.colors.pink }}>sim</TextCheck>
                                <View>
                                    <Switch
                                        trackColor={{ false: thema.colors.violeta, true: thema.colors.pink }}
                                        thumbColor={values.ChildInformation.allergy ? thema.colors.white : thema.colors.white}
                                        value={allergy}
                                        onValueChange={(e) => {
                                            setAllergy(e)
                                            console.log(values.ChildInformation.allergy);
                                            handleChange('ChildInformation.allergy')(String(e));
                                        }}
                                    />
                                </View>

                                <TextCheck style={{ color: thema.colors.pink }}>não</TextCheck>


                            </View>

                            <Input
                                value={values.ChildInformation.WhichAllergy}
                                placeholder="digite a alergia "
                                onChangeText={handleChange('ChildInformation.WhichAllergy')}
                                onBlur={handleBlur('ChildInformation.WhichAllergy')}
                                placeholderTextColor={thema.colors.pinkOpacidy} />

                            <View style={{ flexDirection: 'row', gap: 3, marginBottom: 16, marginTop: 16, }}>
                                <Label>Possui plano de saúde?:  </Label>
                                <TextCheck style={{ color: thema.colors.pink }}>sim</TextCheck>
                                <View>
                                    <Switch
                                        trackColor={{ false: thema.colors.violeta, true: thema.colors.pink }}
                                        thumbColor={values.ChildInformation.HealthInsurance ? thema.colors.white : thema.colors.white}
                                        value={health}
                                        onValueChange={(e) => {
                                            setHealth(e)
                                            console.log(values.ChildInformation.HealthInsurance);
                                            handleChange('ChildInformation.HealthInsurance')(String(e));
                                        }}
                                    />
                                </View>

                                <TextCheck style={{ color: thema.colors.pink }}>não</TextCheck>

                            </View>

                            <Input
                                value={values.ChildInformation.WhichHealthInsurance}

                                placeholder="digite a alergia "
                                onChangeText={handleChange('ChildInformation.WhichHealthInsurance')}
                                onBlur={handleBlur('ChildInformation.WhichHealthInsurance')}
                                placeholderTextColor={thema.colors.pinkOpacidy} />

                            <View style={{ flexDirection: 'row', gap: 3, marginBottom: 16, marginTop: 16, }}>
                                <Label>Possui restrição alimentar?:  </Label>
                                <TextCheck style={{ color: thema.colors.pink }}>sim</TextCheck>
                                <View>
                                    <Switch
                                        trackColor={{ false: thema.colors.violeta, true: thema.colors.pink }}
                                        thumbColor={values.ChildInformation.DietaryRestriction ? thema.colors.white : thema.colors.white}
                                        value={dietaryRestriction}
                                        onValueChange={(e) => {
                                            setDietaryRestriction(e)
                                            handleChange('ChildInformation.DietaryRestriction')(String(e));
                                            console.log(values.ChildInformation.DietaryRestriction);
                                        }}
                                    />
                                </View>
                                <TextCheck style={{ color: thema.colors.pink }}>não</TextCheck>


                            </View>

                            <Input
                                value={values.ChildInformation.WhichDietaryRestriction}

                                placeholder="digite a restrição alimentar "
                                onChangeText={handleChange('ChildInformation.WhichDietaryRestriction')}
                                onBlur={handleBlur('ChildInformation.WhichDietaryRestriction')}
                                placeholderTextColor={thema.colors.pinkOpacidy} />
                        </View>
                        <Title>Informação da importantes</Title>
                        <View style={{ borderWidth: 1, borderColor: thema.colors.pink, borderRadius: 5, width: '90%', padding: 10, marginLeft: 16, }}>
                            <View style={{ flexDirection: 'row', gap: 3, marginBottom: 16, marginTop: 16, }}>
                                <TextCheck style={{ color: thema.colors.pink }}>Diária</TextCheck>
                                <View>
                                    <RadioButton
                                        color={thema.colors.pink}
                                        uncheckedColor={thema.colors.pink}
                                        value="daily"
                                        status={daily ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            const updatedValue = !daily;
                                            setDaily(updatedValue); // Atualiza o estado local
                                            handleChange('ImportantInformation.daily')(String(updatedValue)); // Atualiza o estado do Formik
                                            console.log(updatedValue);
                                        }}
                                    />
                                </View>

                                <Label style={{ color: thema.colors.pink }}>R$</Label>
                                <InputChek style={{ borderBottomWidth: 1, borderColor: thema.colors.pink, paddingBottom: 0, paddingHorizontal: 7 }}
                                    value={values.ImportantInformation.WhichDaily}
                                    onChangeText={handleChange('WhichDaily')}
                                    onBlur={handleBlur('WhichDaily')}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', gap: 3, marginBottom: 16, marginTop: 16, }}>
                                <TextCheck style={{ color: thema.colors.pink }}>Pernoite</TextCheck>
                                <View>
                                    <RadioButton
                                        color={thema.colors.pink}
                                        uncheckedColor={thema.colors.pink}
                                        value="overnight"
                                        status={overnight ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            const updatedValue = !overnight;
                                            setOvernight(updatedValue); // Atualiza o estado local
                                            handleChange('ImportantInformation.overnight')(String(updatedValue)); // Atualiza o estado do Formik
                                            console.log(updatedValue);
                                        }}
                                    />
                                </View>

                                <Label style={{ color: thema.colors.pink }}>R$</Label>
                                <InputChek style={{ borderBottomWidth: 1, borderColor: thema.colors.pink, paddingBottom: 0, paddingHorizontal: 7 }}
                                    value={values.ImportantInformation.WhichOvernight}
                                    onChangeText={handleChange('WhichOvernight')}
                                    onBlur={handleBlur('WhichOvernight')}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', gap: 3, marginBottom: 16, marginTop: 16, }}>
                                <TextCheck style={{ color: thema.colors.pink }}>Viagem</TextCheck>
                                <View>
                                    <RadioButton
                                        color={thema.colors.pink}
                                        uncheckedColor={thema.colors.pink}
                                        value="travel"
                                        status={travel ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            const updatedValue = !travel;
                                            setTravel(updatedValue); // Atualiza o estado local
                                            handleChange('ImportantInformation.travel')(String(updatedValue)); // Atualiza o estado do Formik
                                            console.log(updatedValue);
                                        }}
                                    />
                                </View>

                                <Label style={{ color: thema.colors.pink }}>R$</Label>
                                <InputChek style={{ borderBottomWidth: 1, borderColor: thema.colors.pink, paddingBottom: 0, paddingHorizontal: 7 }}
                                    value={values.ImportantInformation.WhichTravel}
                                    onChangeText={handleChange('WhichTravel')}
                                    onBlur={handleBlur('WhichTravelt')}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', gap: 3, marginBottom: 16, marginTop: 16, }}>
                                <TextCheck style={{ color: thema.colors.pink }}>Passeio</TextCheck>
                                <View>
                                    <RadioButton
                                        color={thema.colors.pink}
                                        uncheckedColor={thema.colors.pink}
                                        value="stroll"
                                        status={stroll ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            const updatedValue = !stroll;
                                            setStroll(updatedValue); // Atualiza o estado local
                                            handleChange('ImportantInformation.stroll')(String(updatedValue)); // Atualiza o estado do Formik
                                            console.log(updatedValue);
                                        }}
                                    />
                                </View>

                                <Label style={{ color: thema.colors.pink }}>R$</Label>
                                <InputChek style={{ borderBottomWidth: 1, borderColor: thema.colors.pink, paddingBottom: 0, paddingHorizontal: 7 }}
                                    value={values.ImportantInformation.WhichStroll}
                                    onChangeText={handleChange('WhichStroll')}
                                    onBlur={handleBlur('WhichStroll')}
                                />
                            </View>
                        </View>
                        <ButtomSubmit onPress={() => handleSubmit()}>
                            <TextSubmit>Cadastrar</TextSubmit>
                        </ButtomSubmit>

                    </Conteiner>
                )}
            </Formik>
        </View >
    );
}