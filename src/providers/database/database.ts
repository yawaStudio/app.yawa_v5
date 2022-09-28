import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class DatabaseProvider {

  db: SQLiteObject;
  table="tickets";
  constructor(public http: HttpClient, private sqlite: SQLite) {
    this.createDatabaseFile();
  }

  async createDatabaseFile(){
    await this.sqlite.create({
      name: "yawa_db",
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        //return 'Bdd créée !';
        this.db = db;
      })
      .catch((e) => {
        alert("error on creating database " + JSON.stringify(e));
      });
      await this.createTables();
  }
  async createTables() {
    await this.db.executeSql(
      `CREATE TABLE IF NOT EXISTS ${this.table} (id	INTEGER PRIMARY KEY AUTOINCREMENT, service_id INTEGER, rate_id INTEGER, rate_name VARCHAR(255), rotation_id	INTEGER, price	INTEGER,  qut	INTEGER)`, [])
    .then(() => {
      console.log('Table tickets created !');
    })
    .catch(e => console.log(e));
  }
  async create(service_id: number, rate_id: number,  rate_name: string, rotation_id: number, price: number, qut: number ){
    await this.db.executeSql(
      `INSERT INTO ${this.table} (service_id, rate_id, rate_name, rotation_id, price, qut) VALUES (${service_id}, ${rate_id}, '${rate_name}', ${rotation_id}, ${price}, ${qut})`,
      []
    )
    .then(()=>{
      return "ticket created"
    })
    .catch((e)=>{
      return "error ticket create " + JSON.stringify(e)
    })
  }

  async update(rate_id: number, qut: number){
    await this.db.executeSql(
      `UPDATE ${this.table} SET qut =${qut} WHERE rate_id = ${rate_id}`,
      []
    )
    .then(()=>{
      return "ticket updated"
    })
    .catch((e)=>{
      return "error ticket updated " + JSON.stringify(e)
    })
  }
  async sum_amount(){
    await this.db.executeSql(
      `SELECT SUM(price)FROM ${this.table}`,
      []
    )
    .then((res)=>{
      return res
    })
    .catch((e)=>{
      return "error ticket sum " + JSON.stringify(e)
    })
  }

  async sum_qut(){
    await this.db.executeSql(
      `SELECT SUM(qut)FROM ${this.table}`,
      []
    )
    .then((res)=>{
      return res
    })
    .catch((e)=>{
      return "error ticket sum " + JSON.stringify(e)
    })
  }
  async delete(){
    await this.db.executeSql(
      `DELETE FROM ${this.table}`,
      []
    )
    .then(()=>{
      return "ticket deleted"
    })
    .catch((e)=>{
      return "error ticket deleted " + JSON.stringify(e)
    })
  }
  async select(){
    await this.db.executeSql(
      `SELECT * FROM ${this.table}`,
      []
    )
    .then((res)=>{
      return res
    })
    .catch((e)=>{
      return "error ticket selected " + JSON.stringify(e)
    })
  }
}
