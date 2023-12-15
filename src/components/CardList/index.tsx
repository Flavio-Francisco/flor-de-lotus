
import { AgendaProps } from "../../utils/Models";
import { Conteiner, Name, Procedure,Date } from "./styles";

interface Iporops{
    id?: string;
    date: string;
    name: string;
    procedure: string;
    onCardPress: () => void;
}

export default function CardList({ name, date, procedure,onCardPress}: Iporops) {
    
    return (
        <Conteiner onPress={onCardPress}>
            <Date>{date}</Date>
            <Name>{name}</Name>
            <Procedure>{procedure}</Procedure>
        </Conteiner>
    )
}