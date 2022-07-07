import {Expose} from "class-transformer"

export class Result {
    @Expose()
    city: number;
    @Expose()
    year: number;
    @Expose()
    gold: number;
    @Expose()
    silver: number;
    @Expose()
    bronze: number;
}