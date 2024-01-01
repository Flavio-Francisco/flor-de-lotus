import React, { useState, useEffect, useContext } from 'react';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, ButtomAvatar, Conteiner, TitleX, ViewButtom, X } from './styles';
import { AuthContext } from '../../context/Agenda';
import { SimpleLineIcons } from '@expo/vector-icons';
import { colorChold, thema } from '../../../thema';
import { ChildsRegistrationform } from '../../utils/Models';



const UpdateAvatarUser: React.FC = () => {
    const [image, setImage] = useState<string>('b');
    const { user,AvatarUser } = useContext(AuthContext);
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
            setAvata(result.assets[0].uri);
            AvatarUser(result.assets[0].uri)
            console.log(result.assets[0].uri);
        }

        // Adicione um retorno explícito aqui
        return result;
    };

    useEffect(() => {
       user

    }, [AvatarUser])
    return (
        <Conteiner>

            <ButtomAvatar onPress={pickImage} >
                {user ? (
                    <Avatar source={{ uri: user}} />
                ) : (
                    <Avatar source={require('../../../assets/leninha.jpg')} />
                )}
            </ButtomAvatar>
        </Conteiner>
    );
};

export default UpdateAvatarUser;
