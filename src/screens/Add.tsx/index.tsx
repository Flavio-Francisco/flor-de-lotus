import * as Yup from "yup";
import { Formik, FormikHelpers, useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { ButtomSubmit, Conteiner, Logo, ConteinerdDateMoney, Input, InputDate, InputMoney, InputNote, Label, TextSubmit, Title, TextCheck, InputChek, Icon, Erros } from "./style";
import { Switch, View, Image, Alert, ActivityIndicator } from "react-native";
import { colorChold, thema } from "../../../thema";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/Agenda";
import AwesomeAlert from "react-native-awesome-alerts";
import React from "react";
import { ChildsRegistrationform } from "../../utils/Models";
import Checkbox from "expo-checkbox";
import { RadioButton } from 'react-native-paper';
import { z } from "zod";
import { Check, formatarTelefone } from "../../utils/Function";


const customBooleanOrString = z
    .string()
    .refine((data) => typeof data === 'boolean' || typeof data === 'string', {
        message: 'Deve ser um booleano ou uma string.',
    });

const MyFormValues = z.object({
    date: z.string().refine(value => !value || /^\d{2}\/\d{2}\/\d{4}$/.test(value), {
        message: 'Data inválida. Por favor, use DD/MM/YYYY.',
    }),
    avatar: z.string().optional(),
    ChildGender: z.string().optional(),
    DateOfBirth: z.string().refine(value => !value || /^\d{2}\/\d{2}\/\d{4}$/.test(value), {
        message: 'Data inválida de nascimento. Por favor, use DD/MM/YYYY.',
    }),
    nameChild: z.string().min(1, { message: 'Nome da criança é obrigatório' }),
    nameMother: z.string().min(1, { message: 'Nome da mãe é obrigatório' }),
    nameFather: z.string().min(1, { message: 'Nome do pai é obrigatório' }),
    phone: z.string().min(1, { message: 'Telefone Obrigatório' }),
    Address: z.object({
        street: z.string().min(1, { message: 'Nome da rua é obrigatório' }),
        number: z.string().optional(),
        Neighborhood: z.string().min(1, { message: 'Nome do bairro é obrigatório' }),
        city: z.string().min(1, { message: 'Nome da cidade é obrigatório' }),
    }),
    ChildInformation: z.object({
        allergy: z.string().optional(),
        WhichAllergy: z.string().optional(),
        DietaryRestriction: z.string().optional(),
        WhichDietaryRestriction: z.string().optional(),
        //  drug: customBooleanOrString.optional(),
        WhichDrug: z.string().optional(),
        HealthInsurance: z.string().optional(),
        WhichHealthInsurance: z.string().optional(),
        MarmosetType: z.string().min(1, { message: 'Tipo sanguíneo é obrigatório' }),
    }),
    ImportantInformation: z.object({
        Daily: customBooleanOrString.optional(),
        WhichDaily: z.string().optional(),
        overnight: z.string().optional(),
        WhichOvernight: z.string().optional(),
        travel: z.string().optional(),
        WhichTravel: z.string().optional(),
        stroll: z.string().optional(),
        WhichStroll: z.string().optional(),
    }),
});
import * as yup from 'yup';

export const MyFormSchema = yup.object().shape({
    date: yup.string()
        .required('data é obrigatório')
        .min(8, "a data deve ter esse formato DD/MM/AAAA"),
    avatar: yup.string(),
    ChildGender: yup.string(),
    DateOfBirth: yup.string()
        .required('data de nascimento é obrigatório')
        .min(8, "a data deve ter esse formato DD/MM/AAAA"),
    nameChild: yup.string().required('Nome da criança é obrigatório'),
    nameMother: yup.string().required('Nome da mãe é obrigatório'),
    nameFather: yup.string().required('Nome do pai é obrigatório'),
    phone: yup.string().required('Telefone Obrigatório'),
    Address: yup.object().shape({
        street: yup.string().required('Nome da rua é obrigatório'),
        number: yup.string(),
        Neighborhood: yup.string().required('Nome do bairro é obrigatório'),
        city: yup.string().required('Nome da cidade é obrigatório'),
    }),
    ChildInformation: yup.object().shape({
        allergy: yup.string(),
        WhichAllergy: yup.string(),
        DietaryRestriction: yup.string(),
        WhichDietaryRestriction: yup.string(),
        drug: yup.string(),
        WhichDrug: yup.string(),
        HealthInsurance: yup.string(),
        WhichHealthInsurance: yup.string(),
        MarmosetType: yup.string().required('Tipo sanguíneo é obrigatório'),
    }),
    ImportantInformation: yup.object().shape({
        Daily: yup.string(),
        WhichDaily: yup.string(),
        overnight: yup.string(),
        WhichOvernight: yup.string(),
        travel: yup.string(),
        WhichTravel: yup.string(),
        stroll: yup.string(),
        WhichStroll: yup.string(),
    }),
});



export default function Add() {
    const { navigate } = useNavigation();


    const FormValues: ChildsRegistrationform = {
        date: '',
        avatar: "",
        ChildGender: undefined,
        DateOfBirth: "",
        nameChild: "",
        nameMother: "",
        nameFather: "",
        phone: "",
        Address: {
            street: "",
            number: '',
            Neighborhood: "",
            city: "",
        },
        ChildInformation: {
            allergy: undefined,
            WhichAllergy: "",
            DietaryRestriction: undefined,
            WhichDietaryRestriction: "",
            drug: undefined,
            WhichDrug: "",
            HealthInsurance: undefined,
            WhichHealthInsurance: "",
            MarmosetType: "",
        },
        ImportantInformation: {
            Daily: undefined,
            WhichDaily: "",
            overnight: undefined,
            WhichOvernight: "",
            travel: undefined,
            WhichTravel: "",
            stroll: undefined,
            WhichStroll: "",
        }
    };




    const { create } = useContext(AuthContext);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [dietaryRestriction, setDietaryRestriction] = useState(FormValues.ChildInformation.DietaryRestriction);
    const [stroll, setStroll] = useState(FormValues.ImportantInformation.stroll);
    const [allergy, setAllergy] = useState(FormValues.ChildInformation.allergy);
    const [health, setHealth] = useState(FormValues.ChildInformation.HealthInsurance);
    const [daily, setDaily] = useState(FormValues.ImportantInformation.Daily);
    const [overnight, setOvernight] = useState(FormValues.ImportantInformation.overnight);
    const [travel, setTravel] = useState(FormValues.ImportantInformation.travel);
    const [childGender, setChildGender] = useState(FormValues.ChildGender);
    const [erro, setErro] = useState();
    const [loading, setLoanding] = useState<boolean>();
   
    const handleSubmission = async (values: typeof FormValues, actions: FormikHelpers<typeof FormValues>) => {
       
        try {
            
            // Form submission logic
            // const data = await MyFormValues.parse(values);
            create(values);

            // Reset the form
            actions.resetForm();
            setAllergy(false);
            setChildGender(false);
            setDietaryRestriction(false);
            setHealth(false);
            setOvernight(false);
            setDaily(false);
            setStroll(false);
            setTravel(false);
            navigate('Home');
            setLoanding(false)
        } catch (error: any) {
            console.log(error);
            setErro(error)
            setShowAlert(true)
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Atenção!"
                message={erro}

                contentStyle={{ width: 300, height: 100, }}
                closeOnTouchOutside={true}
                titleStyle={{ fontSize: 22, textAlign: 'center', color: colorChold(childGender) }}
                messageStyle={{ fontSize: 18, color: colorChold(childGender) }}
                closeOnHardwareBackPress={false}
                cancelButtonStyle={{ width: 100, alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: colorChold(childGender), }}
                confirmButtonStyle={{ width: 100, alignItems: 'center', marginLeft: 25, }}


                showConfirmButton={true}
                confirmText="Sim"
                confirmButtonColor={colorChold(childGender)}
                onConfirmPressed={() => {
                    setShowAlert(false)
                }}

            />
            <Logo source={require('../../../assets/logo.png')} />

            <Formik
                enableReinitialize={true}
                initialValues={FormValues}
                onSubmit={handleSubmission
                }
                validationSchema={MyFormSchema}
            >
                {({ handleChange, handleSubmit, handleBlur, values, setFieldValue, errors }) => (
                    <Conteiner>
                        <View style={{ flexDirection: 'row', gap: 3, alignItems: 'center', justifyContent: 'center', marginBottom: 20, marginTop: 30 }}>

                            <Icon
                                style={{ backgroundColor: thema.colors.violeta, padding: 30, borderRadius: 25 }}
                                source={require('../../../assets/menina.png')}
                            />
                            <View style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 28, marginRight: 15, marginLeft: 15, }}>
                                <Switch

                                    trackColor={{ false: thema.colors.violeta, true: thema.colors.blue }}
                                    thumbColor={values.ChildGender ? thema.colors.white : thema.colors.white}
                                    value={Check(childGender)}

                                    onValueChange={(e) => {
                                        setChildGender(e)
                                        handleChange('ChildGender')(String(e));
                                        console.log('====================================');
                                        console.log(e);
                                        console.log('====================================');
                                    }}
                                />
                            </View>

                            <Icon
                                style={{ backgroundColor: thema.colors.blue, padding: 30, borderRadius: 25 }}
                                source={require('../../../assets/menino.png')}
                            />


                        </View>
                        <ConteinerdDateMoney>
                            <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                                <View style={{ width: '50%', marginLeft: 9 }}>
                                    <Label style={{ color: colorChold(childGender) }}>Data</Label>
                                    <InputDate
                                        style={{ borderColor: colorChold(childGender), color: colorChold(childGender) }}
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
                                        placeholderTextColor={colorChold(childGender)}

                                    />
                                    {errors.date ? <Erros>{errors.date}</Erros> : <></>}
                                </View>
                                <View style={{ width: '50%', marginLeft: 7 }}>
                                    <Label style={{ color: colorChold(childGender) }}>Data de nascimento</Label>
                                    <InputDate
                                        style={{ borderColor: colorChold(childGender), color: colorChold(childGender) }}

                                        value={values.DateOfBirth}
                                        placeholder="digite a data "
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
                                        placeholderTextColor={colorChold(childGender)}
                                    />
                                    {errors.DateOfBirth ? <Erros>{errors.DateOfBirth}</Erros> : <></>}
                                </View>
                            </View>



                        </ConteinerdDateMoney>
                        <View style={{ width: '96%', marginLeft: 20, marginTop: 10, elevation: 5, }}>
                            <Label style={{ color: colorChold(childGender) }}>Nome da criança</Label>
                            <Input
                                style={{ borderColor: colorChold(childGender), color: colorChold(childGender) }}
                                value={values.nameChild}
                                placeholder="digite o nome da criança"
                                onChangeText={handleChange('nameChild')}
                                onBlur={handleBlur('nameChild')}
                                placeholderTextColor={colorChold(childGender)} />
                            {errors.nameChild ? <Erros>{errors.nameChild}</Erros> : <></>}

                        </View>
                        <View style={{ width: '96%', marginLeft: 20, marginTop: 10 }}>
                            <Label style={{ color: colorChold(childGender) }}>Nome da mãe</Label>
                            <Input
                                style={{ borderColor: colorChold(childGender), color: colorChold(childGender) }}
                                value={values.nameMother}
                                placeholder="digite o nome da mãe"
                                onChangeText={handleChange('nameMother')}
                                onBlur={handleBlur('nameMother')}
                                placeholderTextColor={colorChold(childGender)} />
                            {errors.nameMother ? <Erros>{errors.nameMother}</Erros> : <></>}
                        </View>
                        <View style={{ width: '96%', marginLeft: 20, marginTop: 10 }}>
                            <Label style={{ color: colorChold(childGender) }}>Nome do pai</Label>
                            <Input
                                style={{ borderColor: colorChold(childGender), color: colorChold(childGender) }}
                                value={values.nameFather}
                                placeholder="digite o nome do pai"
                                onChangeText={handleChange('nameFather')}
                                onBlur={handleBlur('nameFather')}

                                placeholderTextColor={colorChold(childGender)} />
                            {errors.nameFather ? <Erros>{errors.nameFather}</Erros> : <></>}
                        </View>
                        <View style={{ width: '96%', marginLeft: 20, marginTop: 10 }}>
                            <Label style={{ color: colorChold(childGender) }}>Telefone para contato</Label>
                            <Input
                                style={{ borderColor: colorChold(childGender), color: colorChold(childGender) }}
                                value={formatarTelefone(values.phone)}
                                placeholder="digite o número de telefone"
                                onChangeText={(e) => handleChange('phone')(e)}
                                onBlur={handleBlur('phone')}
                                placeholderTextColor={colorChold(childGender)} />
                            {errors.phone ? <Erros>{errors.phone}</Erros> : <></>}
                        </View>
                        <Title style={{ color: colorChold(childGender) }}>Endereço</Title>

                        <View style={{ borderWidth: 1, borderColor: colorChold(childGender), borderRadius: 5, width: '90%', paddingBottom: 20, padding: 20, marginLeft: 16, }}>
                            <Label style={{ color: colorChold(childGender) }}>Rua:</Label>
                            <Input
                                style={{ borderColor: colorChold(childGender), color: colorChold(childGender) }}
                                value={values.Address.street}
                                placeholder="digite o nome da rua"
                                onChangeText={handleChange('Address.street')}
                                onBlur={handleBlur('Address.street')}
                                placeholderTextColor={colorChold(childGender)} />
                            {errors.Address?.street ? <Erros>{errors.Address.street}</Erros> : <></>}

                            <View style={{ flexDirection: 'row', marginBottom: 16, justifyContent: 'space-between' }}>
                                <View>
                                    <Label style={{ color: colorChold(childGender) }}>Bairro:</Label>
                                    <Input
                                        style={{ borderColor: colorChold(childGender), color: colorChold(childGender), width: '100%' }}
                                        value={values.Address.Neighborhood}
                                        placeholder="digite o bairro"
                                        onChangeText={handleChange('Address.Neighborhood')}
                                        onBlur={handleBlur('Address.Neighborhood')}
                                        placeholderTextColor={colorChold(childGender)} />
                                    {errors.Address?.Neighborhood ? <Erros>{errors.Address.Neighborhood}</Erros> : <></>}
                                </View>
                                <View style={{ marginRight: 20, width: '40%' }}>
                                    <Label style={{ color: colorChold(childGender) }}>Nº:</Label>
                                    <Input
                                        style={{ borderColor: colorChold(childGender), color: colorChold(childGender), width: '80%' }}

                                        value={values.Address.number !== undefined ? String(values.Address.number) : ''}
                                        placeholder="Nº"
                                        onChangeText={handleChange('Address.number')}
                                        onBlur={handleBlur('Address.number')}
                                        placeholderTextColor={colorChold(childGender)} />
                                </View>
                            </View>
                            <Label style={{ color: colorChold(childGender) }}>Cidade:</Label>
                            <Input
                                style={{ borderColor: colorChold(childGender), color: colorChold(childGender) }}
                                value={values.Address.city}
                                placeholder="digite o nome da cidade"
                                onChangeText={handleChange('Address.city')}
                                onBlur={handleBlur('Address.city')}
                                placeholderTextColor={colorChold(childGender)} />
                            {errors.Address?.city ? <Erros>{errors.Address.city}</Erros> : <></>}
                        </View>


                        <Title style={{ color: colorChold(childGender) }}>Informação da criança</Title>
                        <View style={{ borderWidth: 1, borderColor: colorChold(childGender), borderRadius: 5, width: '90%', paddingBottom: 20, padding: 20, marginLeft: 16, }}>
                            <View style={{ flexDirection: 'row', gap: 3, }}>
                                <Label style={{ color: colorChold(childGender) }}>Possui alguma alergia?:  </Label>
                                <TextCheck style={{ color: colorChold(childGender) }}>não</TextCheck>
                                <View style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 28, marginRight: 15, marginLeft: 5, marginBottom: 10 }}>
                                    <Switch

                                        trackColor={{ false: 'gray', true: colorChold(childGender) }}
                                        thumbColor={values.ChildInformation.allergy ? thema.colors.white : thema.colors.white}
                                        value={Check(allergy)}
                                        onValueChange={(e) => {

                                            setAllergy(e)

                                            handleChange('ChildInformation.allergy')(String(e));
                                            console.log('====================================');
                                            console.log(e);
                                            console.log('====================================');
                                        }}
                                    />
                                </View>

                                <TextCheck style={{ color: colorChold(childGender) }}>sim</TextCheck>


                            </View>

                            <Input
                                style={{ borderColor: colorChold(childGender), color: colorChold(childGender) }}
                                value={values.ChildInformation.WhichAllergy}
                                placeholder="digite a alergia "
                                onChangeText={handleChange('ChildInformation.WhichAllergy')}
                                onBlur={handleBlur('ChildInformation.WhichAllergy')}
                                placeholderTextColor={colorChold(childGender)} />

                            <View style={{ flexDirection: 'row', gap: 3, marginBottom: 16, marginTop: 16, }}>
                                <Label style={{ borderColor: colorChold(childGender), color: colorChold(childGender) }}>Possui plano de saúde?:  </Label>
                                <TextCheck style={{ color: colorChold(childGender) }}>não</TextCheck>
                                <View style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 28, marginRight: 15, marginLeft: 5 }}>
                                    <Switch
                                        trackColor={{ false: 'gray', true: colorChold(childGender) }}
                                        thumbColor={values.ChildInformation.HealthInsurance ? thema.colors.white : thema.colors.white}
                                        value={Check(health)}
                                        onValueChange={(e) => {
                                            setHealth(e)
                                            console.log(String(e));
                                            handleChange('ChildInformation.HealthInsurance')(String(e));
                                        }}
                                    />
                                </View>

                                <TextCheck style={{ color: colorChold(childGender) }}>sim</TextCheck>

                            </View>

                            <Input
                                style={{ borderColor: colorChold(childGender), color: colorChold(childGender) }}
                                value={values.ChildInformation.WhichHealthInsurance}

                                placeholder="digite a alergia "
                                onChangeText={handleChange('ChildInformation.WhichHealthInsurance')}
                                onBlur={handleBlur('ChildInformation.WhichHealthInsurance')}
                                placeholderTextColor={colorChold(childGender)} />

                            <View style={{ flexDirection: 'row', gap: 3, marginBottom: 16, marginTop: 16, }}>
                                <Label style={{ color: colorChold(childGender) }}>Possui restrição alimentar?:  </Label>
                                <TextCheck style={{ color: colorChold(childGender) }}>não</TextCheck>
                                <View style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 28, marginRight: 15, marginLeft: 5 }}>
                                    <Switch
                                        trackColor={{ false: 'gray', true: colorChold(childGender) }}
                                        thumbColor={values.ChildInformation.DietaryRestriction ? thema.colors.white : thema.colors.white}
                                        value={Check(dietaryRestriction)}
                                        onValueChange={() => {
                                            setDietaryRestriction(!dietaryRestriction)
                                            handleChange('ChildInformation.DietaryRestriction')(String(!dietaryRestriction));
                                            console.log(String(!dietaryRestriction));
                                        }}
                                    />
                                </View>
                                <TextCheck style={{ color: colorChold(childGender) }}>sim</TextCheck>


                            </View>

                            <Input
                                style={{ borderColor: colorChold(childGender), color: colorChold(childGender) }}
                                value={values.ChildInformation.WhichDietaryRestriction}

                                placeholder="digite a restrição alimentar "
                                onChangeText={handleChange('ChildInformation.WhichDietaryRestriction')}
                                onBlur={handleBlur('ChildInformation.WhichDietaryRestriction')}
                                placeholderTextColor={colorChold(childGender)} />

                            <TextCheck style={{ color: colorChold(childGender), marginTop: 20, marginBottom: 10 }}>Tipo sanguíneo</TextCheck>

                            <Input
                                style={{ borderColor: colorChold(childGender), color: colorChold(childGender) }}
                                value={values.ChildInformation.MarmosetType}

                                placeholder="digite o tipo sanguíneo "
                                onChangeText={handleChange('ChildInformation.MarmosetType')}
                                onBlur={handleBlur('ChildInformation.MarmosetType')}
                                placeholderTextColor={colorChold(childGender)} />
                            {errors.ChildInformation?.MarmosetType ? <Erros>{errors.ChildInformation?.MarmosetType}</Erros> : <></>}
                        </View>
                        <Title style={{ color: colorChold(childGender) }}>Informação importantes</Title>
                        <View style={{ borderWidth: 1, borderColor: colorChold(childGender), borderRadius: 5, width: '90%', padding: 10, marginLeft: 16, }}>
                            <View style={{ flexDirection: 'row', gap: 3, marginBottom: 16, marginTop: 16, }}>
                                <TextCheck style={{ color: colorChold(childGender) }}>Diária</TextCheck>
                                <View>
                                    <RadioButton
                                        color={colorChold(childGender)}
                                        uncheckedColor={colorChold(childGender)}
                                        value="Daily"
                                        status={daily ? 'checked' : 'unchecked'}

                                        onPress={() => {

                                            const updatedValue = !daily;
                                            setDaily(updatedValue); // Atualiza o estado local
                                            handleChange('ImportantInformation.Daily')(String(updatedValue)); // Atualiza o estado do Formik
                                            console.log(String(updatedValue));
                                        }}
                                    />
                                </View>

                                <Label style={{ color: colorChold(childGender) }}>R$</Label>
                                <InputChek style={{ borderBottomWidth: 1, borderColor: colorChold(childGender), paddingBottom: 0, paddingHorizontal: 7, color: colorChold(childGender) }}
                                    value={values.ImportantInformation.WhichDaily}
                                    onChangeText={handleChange('ImportantInformation.WhichDaily')}
                                    onBlur={handleBlur('ImportantInformation.WhichDaily')}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', gap: 3, marginBottom: 16, marginTop: 16, }}>
                                <TextCheck style={{ color: colorChold(childGender) }}>Pernoite</TextCheck>
                                <View>
                                    <RadioButton
                                        color={colorChold(childGender)}
                                        uncheckedColor={colorChold(childGender)}
                                        value="overnight"
                                        status={overnight ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            const updatedValue = !overnight;
                                            setOvernight(updatedValue); // Atualiza o estado local
                                            setFieldValue('ImportantInformation.overnight', updatedValue);
                                            handleChange('ImportantInformation.overnight')(String(updatedValue)); // Atualiza o estado do Formik
                                            console.log(updatedValue);
                                        }}
                                    />
                                </View>

                                <Label style={{ color: colorChold(childGender) }}>R$</Label>
                                <InputChek style={{ borderBottomWidth: 1, borderColor: colorChold(childGender), paddingBottom: 0, paddingHorizontal: 7, color: colorChold(childGender) }}
                                    value={values.ImportantInformation.WhichOvernight}
                                    onChangeText={handleChange('ImportantInformation.WhichOvernight')}
                                    onBlur={handleBlur('ImportantInformation.WhichOvernight')}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', gap: 3, marginBottom: 16, marginTop: 16, }}>
                                <TextCheck style={{ color: colorChold(childGender) }}>Viagem</TextCheck>
                                <View>
                                    <RadioButton
                                        color={colorChold(childGender)}
                                        uncheckedColor={colorChold(childGender)}
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

                                <Label style={{ color: colorChold(childGender) }}>R$</Label>
                                <InputChek style={{ borderBottomWidth: 1, borderColor: colorChold(childGender), paddingBottom: 0, paddingHorizontal: 7, color: colorChold(childGender) }}
                                    value={values.ImportantInformation.WhichTravel}
                                    onChangeText={handleChange('ImportantInformation.WhichTravel')}
                                    onBlur={handleBlur('ImportantInformation.WhichTravel')}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', gap: 3, marginBottom: 16, marginTop: 16, }}>
                                <TextCheck style={{ color: colorChold(childGender) }}>Passeio</TextCheck>
                                <View>
                                    <RadioButton
                                        color={colorChold(childGender)}
                                        uncheckedColor={colorChold(childGender)}
                                        value="stroll"
                                        status={stroll ? 'checked' : 'unchecked'}

                                        onPress={() => {

                                            setStroll(!stroll); // Atualiza o estado local
                                            handleChange('ImportantInformation.stroll')(String(!stroll)); // Atualiza o estado do Formik
                                            console.log(!stroll);
                                        }}
                                    />
                                </View>

                                <Label style={{ color: colorChold(childGender) }}>R$</Label>
                                <InputChek style={{ borderBottomWidth: 1, borderColor: colorChold(childGender), paddingBottom: 0, paddingHorizontal: 7, color: colorChold(childGender) }}
                                    value={values.ImportantInformation.WhichStroll}
                                    onChangeText={handleChange('ImportantInformation.WhichStroll')}
                                    onBlur={handleBlur('ImportantInformation.WhichStroll')}
                                />
                            </View>
                        </View>
                        <ButtomSubmit
                            style={{ backgroundColor: colorChold(childGender) }}
                            onPress={() => {
                                setLoanding(true)
                                handleSubmit()


                            }}>
                            {loading === true ?
                                <TextSubmit>
                                    <ActivityIndicator size="small" color="#fff" />
                                </TextSubmit>
                                :
                                <TextSubmit>Cadastrar</TextSubmit>
                            }



                        </ButtomSubmit>

                    </Conteiner>
                )}
            </Formik>
        </View >
    );
}