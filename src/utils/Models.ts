export interface AgendaProps {
  id?: string;
  date: string|undefined;
  name: string|undefined;
  procedure: string|undefined;
  money?: string|undefined;
  note?: string|undefined;
  taggert?: boolean|undefined;
}
export interface ChildsRegistrationform{
  id?: string;
  date: string|undefined;
  DateOfBirth:string|undefined;
  nameChild: string|undefined;
  nameMother: string|undefined;
  nameFather: string|undefined;
  Address:{
    street:string|undefined;
    number:number|undefined;
    Neighborhood:string|undefined;
    city:string|undefined;
  }
  ChildInformation:{
    allergy: boolean|undefined;
    WhichAllergy:string|undefined;
    DietaryRestriction:boolean|undefined;
    WhichDietaryRestriction:string|undefined;
    drug: boolean|undefined;
    WhichDrug:string|undefined;
    HealthInsurance: boolean|undefined;
    WhichHealthInsurance: string|undefined;
    MarmosetType: string|undefined;
  }
  ImportantInformation:{
    Daily: string|undefined;
    overnight: string|undefined;
    travel: string|undefined;
    stroll: string|undefined;
  }
}