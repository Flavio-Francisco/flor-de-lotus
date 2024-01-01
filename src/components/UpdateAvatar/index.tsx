import React, { useState, useEffect, useContext } from 'react';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, ButtomAvatar, Conteiner, TitleX, ViewButtom, X } from './styles';
import { AuthContext } from '../../context/Agenda';
import { SimpleLineIcons } from '@expo/vector-icons';
import { colorChold, thema } from '../../../thema';
import { ChildsRegistrationform } from '../../utils/Models';

interface IProps {
    closeModal: () => void;
    props: ChildsRegistrationform | undefined
}

const UpdateAvatar: React.FC<IProps> = ({ props ,closeModal }: IProps) => {
    const [image, setImage] = useState<string>('b');
    const { setAvatar, DataArry } = useContext(AuthContext);
    const [avatar, setAvata] = useState<string | undefined>();


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (result && result.assets) {
            const selectedImage = result.assets[0].uri;
            setImage(result.assets[0].uri);
            setAvatar(props?.id, selectedImage,props);
            console.log(result.assets[0].uri);
        }

        // Adicione um retorno explícito aqui
        return result;
    };

    useEffect(() => {
        const foto = DataArry.find(item => item.id === props?.id);
        console.log('====================================');
        console.log("essa e a foto", foto?.avatar);
        console.log("essa e o id", props?.id);
        console.log("essa e o avatar", avatar);
        console.log('====================================');
        setAvata(foto?.avatar)

    }, [setAvatar])
    return (
        <Conteiner>
             <X onPress={closeModal}>
                <TitleX style={{ color: colorChold(props?.ChildGender) }} >X</TitleX>
            </X >
            <TitleX style={{ color: colorChold(props?.ChildGender) ,marginTop:70 , fontSize:30}}>Atualizar foto</TitleX>
            {avatar? (
                <Avatar source={{ uri:avatar }} />
            ) : (
                <Avatar source={require('../../../assets/foto.jpg')} />
            )}

            <ButtomAvatar onPress={pickImage} style={{ backgroundColor: (colorChold(props?.ChildGender)) }}>
                <SimpleLineIcons name="camera" size={40} color={'gray'} />
            </ButtomAvatar>
        </Conteiner>
    );
};

export default UpdateAvatar;
