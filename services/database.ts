import sqlite3 = require('sqlite3');
import {IDatabaseAccessLayer} from './interfaces/idatabase'
import md5 = require('md5');
import { Athlete } from '../entities/athelete';
import { Game } from '../entities/game'
import {plainToClass} from 'class-transformer'
import { Result } from '../entities/result';
import { ImageFile } from '../entities/imageFile';

sqlite3.verbose();

const db_file = 'athletes.db';

export class DatabaseAccessLayer implements IDatabaseAccessLayer {

    db : sqlite3.Database

    constructor() {
        this.db = new sqlite3.Database(db_file, (err) => {
            if (err){
                console.log(err.message);
                throw err;
            }
            else {
                console.log("Connected to SQLite database");
            }
        });
    }
    
    getAthlete(id: string) : Promise<Athlete>{
        var sql = "select * from Athlete where athlete_id = ?";
        var params = [id];
        return new Promise((resolve, reject) =>
            this.db.all(sql, params, (err, row) => {
                if (err || row == null){
                    var msg = `Unable to obtain athlete from db: ${err}`;
                    console.log(msg);
                    reject(msg);
                }
                else {
                    console.log(row);
                    let ath = plainToClass(Athlete, row, { excludeExtraneousValues: true });                    
                    resolve(ath[0]);
                }
            })
        );
    }

    getAthletes() : Promise<Athlete[]> {
        let sql = "select * from Athlete"
        return new Promise((resolve, reject) => {
            this.db.all(sql, (err, rows) => {
                if (err || rows == null) {
                    var msg = "Unable to obtain athletes";
                    console.log(msg);
                    reject(msg)                    
                }
                else {
                    let athletes = plainToClass(Athlete, rows, {excludeExtraneousValues: true });
                    resolve(athletes);
                }
            });
        });
    }

    getAthleteResults(id: string) : Promise<Result[]>{
        let sql = `
            select g.city, g.year, ar.gold, ar.silver, ar.bronze  from AthleteResult ar
            inner join Game g on ar.game_id = g.game_id
            where ar.athlete_id = ?            
        `;
        let params = [id];
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err || rows == null) {
                    var msg = "Unable to obtain results for athlete";
                    console.log(msg);
                    reject(msg);
                }
                else {                    
                    let results = plainToClass(Result, rows)
                    resolve(results);
                }
            });
        });
    }

    getAthletePhoto(id: string) : Promise<any> {
        let sql = `select p.photo, p.mime_type from AthletePhoto p
                   inner join Athlete a on a.photo_id = p.photo_id
                   where a.athlete_id = ?`
        let params = [id]
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, row) => {
                if (err || row == null) {
                    var msg = `No image found for athlete with id: ${id}`
                    console.log(msg)
                    reject(err)
                }
                else {
                    let img = new ImageFile(row.mime_type, row.photo)
                    console.log(img)
                    resolve(img)                    
                }
            })
        });
    }

    getGames() : Promise<Game[]> {
        let sql = `select * from Game`        

        return new Promise((resolve, reject) => {
            this.db.all(sql, (err, rows) => {
                if (err || rows == null) {
                    var msg = "Unable to obtain results for games";
                    console.log(msg);
                    reject(msg);
                }
                else {                                        
                    let results = plainToClass(Game, rows)
                    resolve(results);
                }
            })
        })
    }

    getAthletesByGame(game_id : string) : Promise<Athlete[]> {
        let sql = `select a.* from Athlete a
        inner join AthleteResult ar on a.athlete_id = ar.athlete_id
        where ar.game_id = ?`
        let params = [game_id]

        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err || rows == null) {
                    var msg = "Unable to obtain results for games";
                    console.log(msg);
                    reject(msg);
                }
                else {                    
                    let results = plainToClass(Athlete, rows)
                    resolve(results);
                }
            });
        });
    }
}