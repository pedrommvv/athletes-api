import { Expose } from "class-transformer";

export class Athlete {
    constructor(id: string, name: string){
        this.athlete_id = id;
        this.name = name;        
    }

    @Expose()
    athlete_id: string;
    @Expose()    
    name : string;
    @Expose()
    surname: string;
    @Expose( {name: "date_of_birth"})
    dateOfBirth: string;
    @Expose()
    bio: string;
    @Expose()
    weight: number;
    @Expose()
    height: number;
    @Expose()
    photo_id: number 
}