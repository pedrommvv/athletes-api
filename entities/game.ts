import {Expose} from 'class-transformer'

export class Game {
    constructor(id: number, city: string, year: number) {
        this.game_id = id
        this.city = city
        this.year = year
    }

    @Expose()
    game_id: number

    @Expose()
    city: string

    @Expose()
    year: number
}