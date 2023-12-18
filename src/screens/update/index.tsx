import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";

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
    return (
        <>
        </>
    );
}

