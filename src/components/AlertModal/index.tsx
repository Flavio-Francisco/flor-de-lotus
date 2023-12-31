import React from "react";
import { useContext } from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import { AuthContext } from "../../context/Agenda";
import { colorChold, thema } from "../../../thema";

interface Iprops{
    ChildGender:boolean
}


export default function AlertModal({ChildGender}:Iprops) {
    const { valadation, setValidation } = useContext(AuthContext);

    return (
        <>
            <AwesomeAlert
                show={valadation}
                showProgress={false}
                title="Olá"
                message="criança já cadastrada!"
                contentStyle={{ width: 300, height: 100, }}
                closeOnTouchOutside={true}
                titleStyle={{ fontSize: 22, textAlign: 'center', color: colorChold(ChildGender)}}
                messageStyle={{ fontSize: 20, color: colorChold(ChildGender) }}
                closeOnHardwareBackPress={false}
                confirmButtonStyle={{ width: 100,height: 40, alignItems: 'center', marginLeft: 25,textAlign: 'center' }}
                confirmButtonTextStyle={{fontSize: 18,}}
                showConfirmButton={true}
                confirmText="Ok"
                confirmButtonColor={colorChold(ChildGender)}
                onConfirmPressed={() => {
                    setValidation(false)
                }}
                cancelText="Não"

            />
        </>
    )
}