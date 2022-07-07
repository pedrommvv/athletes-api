import { Athlete } from "../../entities/athelete";

export interface IDatabaseAccessLayer {
    getAthlete(athlete_id:String) : Promise<Athlete>;
}