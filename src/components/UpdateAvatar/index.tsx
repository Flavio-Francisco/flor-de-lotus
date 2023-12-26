import React, { useState, useEffect, useContext } from 'react';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, ButtomAvatar, Conteiner, ViewButtom } from './styles';
import { AuthContext } from '../../context/Agenda';
import { SimpleLineIcons } from '@expo/vector-icons';
import { colorChold, thema } from '../../../thema';
import { ChildsRegistrationform } from '../../utils/Models';


export default function UpdateAvatar(props:ChildsRegistrationform) {
    const [image, setImage] = useState<string>('b');
    const { setAvatar } = useContext(AuthContext);

   

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
            setAvatar({ ...props, avatar: selectedImage });
            console.log(result.assets[0].uri);
          
    };




    return (
        <Conteiner>

            {image == 'b' ?
                <Avatar source={{ uri: props.avatar}} />
                :
                <Avatar source={{ uri: image }} />
            }

            <ButtomAvatar onPress={pickImage} style={{backgroundColor:colorChold(props.ChildGender)}} >

                <SimpleLineIcons name="camera" size={24} color={thema.colors.pink} />

            </ButtomAvatar>

        </Conteiner>
    );
}
}