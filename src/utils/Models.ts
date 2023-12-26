export interface AgendaProps {
  id?: string;
  avatar:string;
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
  avatar:string;
  ChildGender: boolean;
  DateOfBirth:string;
  nameChild: string|undefined;
  nameMother: string|undefined;
  nameFather: string|undefined;
  phone:string|undefined;
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
    Daily: boolean|undefined;
    WhichDaily: string|undefined;
    overnight: boolean|undefined;
    WhichOvernight: string|undefined;
    travel: boolean|undefined;
    WhichTravel: string|undefined;
    stroll: boolean|undefined;
    WhichStroll: string|undefined;
  }
}