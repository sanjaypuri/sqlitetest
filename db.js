const sqlite = require('sqlite3').verbose();

const DATASOURCE = "./data.db"

const db = new sqlite.Database(DATASOURCE, sqlite.OPEN_READWRITE, (err) => {
  if(err){
    console.error(err.message);
    throw err;
  } else {
    console.log('connected to data.db');
  }
});

module.exports = db;