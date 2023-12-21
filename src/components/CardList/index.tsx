
import { AgendaProps } from "../../utils/Models";
import { Conteiner, Name, Procedure,Date } from "./styles";

interface Iporops{
    id?: string|undefined;
    date: string|undefined;
    name: string|undefined;
    procedure:string|undefined;
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