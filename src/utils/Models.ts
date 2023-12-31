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
  avatar?:string|undefined;
  ChildGender?:boolean|string|undefined;
  DateOfBirth:string|undefined;
  nameChild: string|undefined;
  nameMother: string|undefined;
  nameFather: string|undefined;
  phone:string|undefined;
  Address:{
    street:string|undefined;
    number?:string|undefined;
    Neighborhood:string|undefined;
    city:string|undefined;
  }
  ChildInformation:{
    allergy?: boolean|string|undefined;
    WhichAllergy?:string|undefined;
    DietaryRestriction?:boolean|string|undefined;
    WhichDietaryRestriction?:string|undefined;
    drug?: boolean|string|undefined;
    WhichDrug?:string|undefined;
    HealthInsurance?: boolean|string|undefined;
    WhichHealthInsurance?: string|undefined;
    MarmosetType?: string|undefined;
  }
  ImportantInformation:{
    Daily?:boolean|string|undefined;
    WhichDaily?: string|undefined;
    overnight?: boolean|string|undefined;
    WhichOvernight?: string|undefined;
    travel?: boolean|string|undefined;
    WhichTravel?: string|undefined;
    stroll?:boolean|string|undefined;
    WhichStroll?: string|undefined;
  }
}