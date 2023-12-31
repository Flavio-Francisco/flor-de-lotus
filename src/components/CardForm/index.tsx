
import { Formik, FormikHelpers, useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { ButtomSubmit, Conteiner, Logo, ConteinerdDateMoney, Input, InputDate, InputMoney, InputNote, Label, TextSubmit, Title, TextCheck, InputChek, Icon, X, TitleX } from "./style";
import { Switch, View, Image } from "react-native";
import { colorChold, thema } from "../../../thema";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Agenda";
import AwesomeAlert from "react-native-awesome-alerts";
import React from "react";
import { ChildsRegistrationform } from "../../utils/Models";

import { RadioButton } from 'react-native-paper';
import { set, z } from "zod";
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
    ChildGender: customBooleanOrString.optional(),
    DateOfBirth: z.string().refine(value => !value || /^\d{2}\/\d{2}\/\d{4}$/.test(value), {
        message: 'Data inválida de nascimento. Por favor, use DD/MM/YYYY.',
    }),
    nameChild: z.string().min(1, { message: 'Nome da criança é obrigatório' }),
    nameMother: z.string().min(1, { message: 'Nome da mãe é obrigatório' }),
    nameFather: z.string().min(1, { message: 'Nome do pai é obrigatório' }),
    phone: z.string().refine(value => !value || /^\d{11}$/.test(value), {
        message: 'Formato de telefone inválido (apenas números)',
    }),
    Address: z.object({
        street: z.string().min(1, { message: 'Nome da rua é obrigatório' }),
        number: z.string().optional(),
        Neighborhood: z.string().min(1, { message: 'Nome do bairro é obrigatório' }),
        city: z.string().min(1, { message: 'Nome da cidade é obrigatório' }),
    }),
    ChildInformation: z.object({
        allergy: customBooleanOrString.optional(),
        WhichAllergy: z.string().optional(),
        DietaryRestriction: customBooleanOrString.optional(),
        WhichDietaryRestriction: z.string().optional(),
        //  drug: customBooleanOrString.optional(),
        WhichDrug: z.string().optional(),
        HealthInsurance: customBooleanOrString.optional(),
        WhichHealthInsurance: z.string().optional(),
        MarmosetType: z.string().min(1, { message: 'Tipo sanguíneo é obrigatório' }),
    }),
    ImportantInformation: z.object({
        Daily: customBooleanOrString.optional(),
        WhichDaily: z.string().optional(),
        overnight: customBooleanOrString.optional(),
        WhichOvernight: z.string().optional(),
        travel: customBooleanOrString.optional(),
        WhichTravel: z.string().optional(),
        stroll: customBooleanOrString.optional(),
        WhichStroll: z.string().optional(),
    }),
});




interface CardFormProps {
    props: ChildsRegistrationform | undefined;
    closeModal: () => void;
}
export default function CardForm({ props, closeModal }: CardFormProps) {
    const { navigate } = useNavigation();


    const FormValues: ChildsRegistrationform = {
        date: "",
        avatar: '',
        ChildGender: props?.ChildGender,
        DateOfBirth: props?.DateOfBirth,
        nameChild: props?.nameChild,
        nameMother: props?.nameMother,
        nameFather: props?.nameFather,
        phone: props?.phone,
        Address: {
            street: props?.Address.street,
            number: props?.Address.number,
            Neighborhood: props?.Address.Neighborhood,
            city: props?.Address.city,
        },
        ChildInformation: {
            allergy: props?.ChildInformation.allergy,
            WhichAllergy: props?.ChildInformation.WhichAllergy,
            DietaryRestriction: props?.ChildInformation.DietaryRestriction,
            WhichDietaryRestriction: props?.ChildInformation.WhichDietaryRestriction,
            drug: props?.ChildInformation.drug,
            WhichDrug: props?.ChildInformation.WhichDrug,
            HealthInsurance: props?.ChildInformation.HealthInsurance,
            WhichHealthInsurance: props?.ChildInformation.WhichHealthInsurance,
            MarmosetType: props?.ChildInformation.MarmosetType,
        },
        ImportantInformation: {
            Daily: false,
            WhichDaily: "",
            overnight: false,
            WhichOvernight: "",
            travel: false,
            WhichTravel: "",
            stroll: false,
            WhichStroll: "",
        }
    };




    const { updateData } = useContext(AuthContext);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [conf, setConf] = useState<boolean>(false);
    const [dietaryRestriction, setDietaryRestriction] = useState(FormValues.ChildInformation.DietaryRestriction);
    const [stroll, setStroll] = useState(false);
    const [allergy, setAllergy] = useState(FormValues.ChildInformation.allergy);
    const [health, setHealth] = useState(FormValues.ChildInformation.HealthInsurance);
    const [daily, setDaily] = useState(false);
    const [overnight, setOvernight] = useState(false);
    const [travel, setTravel] = useState(false);
    const [childGender, setChildGender] = useState(FormValues.ChildGender);

    const handleSubmission = async (actions: FormikHelpers<typeof FormValues>) => {
        try {
            // Form submission logic
            // const data = await MyFormValues.parse(values);


            // Reset the form
            actions.resetForm();

            navigate('Home');
        } catch (error) {
            console.log(error);
            setShowAlert(true)
        }
    };
    useEffect(() => {
        console.log('====================================');
        console.log(props?.ChildGender);
        console.log('====================================');
    })
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <X onPress={closeModal}>
                <TitleX style={{ color: colorChold(childGender) }} >X</TitleX>
            </X >
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Atenção!"
                message="Preencha o formulario Corretamente!"

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
                onSubmit={(values, actions) => {

                    if (values) {
                        updateData(values);
                        handleSubmission(actions)
                        setConf(false)
                        closeModal()
                    } else {
                        console.log('====================================');
                        console.log('deu errado');
                        console.log('====================================');
                    }
                }
                }
            //   validationSchema={MyFormValues}
            >
                {({ handleChange, handleSubmit, handleBlur, values, setFieldValue, resetForm }) => (
                    <Conteiner>

                        <View style={{ flexDirection: 'row', gap: 3, alignItems: 'center', justifyContent: 'center', marginBottom: 20, marginTop: 30 }}>

                            {Check(props?.ChildGender) === false ? <Icon
                                style={{ backgroundColor: thema.colors.violeta, padding: 30, borderRadius: 25 }}
                                source={require('../../../assets/menina.png')}
                            />

                                :
                                <Icon
                                    style={{ backgroundColor: thema.colors.blue, padding: 30, borderRadius: 25 }}
                                    source={require('../../../assets/menino.png')}
                                />}


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
                                </View>
                                <View style={{ width: '50%', marginLeft: 7 }}>
                                    <Label style={{ color: colorChold(childGender) }}>Data de nascimento</Label>
                                    <InputDate
                                        style={{ borderColor: colorChold(childGender), color: colorChold(childGender) }}
                                        value={values.DateOfBirth}
                                        editable={false}
                                        placeholderTextColor={colorChold(childGender)}
                                    />
                                </View>
                            </View>



                        </ConteinerdDateMoney>
                        <View style={{ width: '96%', marginLeft: 20, marginTop: 10, elevation: 5, }}>
                            <Label style={{ color: colorChold(childGender) }}>Nome da criança</Label>
                            <Input
                                style={{ borderColor: colorChold(childGender), color: colorChold(childGender) }}
                                value={values.nameChild}
                                editable={false}
                                placeholderTextColor={colorChold(childGender)} />
                        </View>
                        <View style={{ width: '96%', marginLeft: 20, marginTop: 10 }}>
                            <Label style={{ color: colorChold(childGender) }}>Nome da mãe</Label>
                            <Input
                                style={{ borderColor: colorChold(childGender), color: colorChold(childGender) }}
                                value={values.nameMother}
                                editable={false}
                                placeholderTextColor={colorChold(childGender)} />
                        </View>
                        <View style={{ width: '96%', marginLeft: 20, marginTop: 10 }}>
                            <Label style={{ color: colorChold(childGender) }}>Nome do pai</Label>
                            <Input
                                style={{ borderColor: colorChold(childGender), color: colorChold(childGender) }}
                                value={values.nameFather}
                                editable={false}
                                placeholderTextColor={colorChold(childGender)} />
                        </View>
                        <View style={{ width: '96%', marginLeft: 20, marginTop: 10 }}>
                            <Label style={{ color: colorChold(childGender) }}>Telefone para contato</Label>
                            <Input
                                style={{ borderColor: colorChold(childGender), color: colorChold(childGender) }}
                                value={formatarTelefone(values.phone)}
                                editable={false}
                                placeholderTextColor={colorChold(childGender)} />
                        </View>
                        <Title style={{ color: colorChold(childGender) }}>Endereço</Title>

                        <View style={{ borderWidth: 1, borderColor: colorChold(childGender), borderRadius: 5, width: '90%', paddingBottom: 20, padding: 20, marginLeft: 16, }}>
                            <Label style={{ color: colorChold(childGender) }}>Rua:</Label>
                            <Input
                                style={{ borderColor: colorChold(childGender), color: colorChold(childGender) }}
                                value={values.Address.street}
                                editable={false}
                                placeholderTextColor={colorChold(childGender)} />
                            <View style={{ flexDirection: 'row', marginBottom: 16, justifyContent: 'space-between' }}>
                                <View>
                                    <Label style={{ color: colorChold(childGender) }}>Bairro:</Label>
                                    <Input
                                        style={{ borderColor: colorChold(childGender), color: colorChold(childGender), width: '100%' }}
                                        value={values.Address.Neighborhood}
                                        editable={false}
                                        placeholderTextColor={colorChold(childGender)} />
                                </View>
                                <View style={{ marginRight: 70, width: '40%' }}>
                                    <Label style={{ color: colorChold(childGender) }}>Nº:</Label>
                                    <Input
                                        style={{ borderColor: colorChold(childGender), color: colorChold(childGender), width: '80%' }}

                                        value={values.Address.number !== undefined ? String(values.Address.number) : ''}
                                        editable={false}
                                        placeholderTextColor={colorChold(childGender)} />
                                </View>
                            </View>
                            <Label style={{ color: colorChold(childGender) }}>Cidade:</Label>
                            <Input
                                style={{ borderColor: colorChold(childGender), color: colorChold(childGender) }}
                                value={values.Address.city}
                                editable={false}
                                placeholderTextColor={colorChold(childGender)} />
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

                                    />
                                </View>

                                <TextCheck style={{ color: colorChold(childGender) }}>sim</TextCheck>


                            </View>

                            <Input
                                style={{ borderColor: colorChold(childGender), color: colorChold(childGender) }}
                                value={values.ChildInformation.WhichAllergy}
                                editable={false}
                                placeholderTextColor={colorChold(childGender)} />

                            <View style={{ flexDirection: 'row', gap: 3, marginBottom: 16, marginTop: 16, }}>
                                <Label style={{ borderColor: colorChold(childGender), color: colorChold(childGender) }}>Possui plano de saúde?:  </Label>
                                <TextCheck style={{ color: colorChold(childGender) }}>não</TextCheck>
                                <View style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 28, marginRight: 15, marginLeft: 5 }}>
                                    <Switch
                                        trackColor={{ false: 'gray', true: colorChold(childGender) }}
                                        thumbColor={values.ChildInformation.HealthInsurance ? thema.colors.white : thema.colors.white}
                                        value={Check(health)}

                                    />
                                </View>

                                <TextCheck style={{ color: colorChold(childGender) }}>não</TextCheck>

                            </View>

                            <Input
                                style={{ borderColor: colorChold(childGender), color: colorChold(childGender) }}
                                value={values.ChildInformation.WhichHealthInsurance}
                                editable={false}
                                placeholderTextColor={colorChold(childGender)} />

                            <View style={{ flexDirection: 'row', gap: 3, marginBottom: 16, marginTop: 16, }}>
                                <Label style={{ color: colorChold(childGender) }}>Possui restrição alimentar?:  </Label>
                                <TextCheck style={{ color: colorChold(childGender) }}>não</TextCheck>
                                <View style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 28, marginRight: 15, marginLeft: 5 }}>
                                    <Switch
                                        trackColor={{ false: 'gray', true: colorChold(childGender) }}
                                        thumbColor={values.ChildInformation.DietaryRestriction ? thema.colors.white : thema.colors.white}
                                        value={Check(dietaryRestriction)}

                                    />
                                </View>
                                <TextCheck style={{ color: colorChold(childGender) }}>sim</TextCheck>


                            </View>

                            <Input
                                style={{ borderColor: colorChold(childGender), color: colorChold(childGender) }}
                                value={values.ChildInformation.WhichDietaryRestriction}
                                editable={false}
                                placeholderTextColor={colorChold(childGender)} />

                            <TextCheck style={{ color: colorChold(childGender), marginTop: 20, marginBottom: 10 }}>Tipo sanguíneo</TextCheck>

                            <Input
                                style={{ borderColor: colorChold(childGender), color: colorChold(childGender) }}
                                value={values.ChildInformation.MarmosetType}
                                editable={false}
                                placeholderTextColor={colorChold(childGender)} />
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
                                handleSubmit()
                            }}>
                            <TextSubmit>Agendar data</TextSubmit>
                        </ButtomSubmit>

                    </Conteiner>
                )}
            </Formik>
        </View >
    );
}