const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const url = require('url');
const db = require('./db.js');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(5000, ()=> {
  console.log("server is listning on port 5000");
});

app.get("/passwords", (req, resp) => {
  const sql = 'select * from passwords';
  try{
    db.all(sql, [], (err, rows) => {
      if(err){
        return resp.json({status: 300, success: false, error:err});
      }
      if(rows.length < 1){
        return resp.json({status: 300, success: false, error:"no records"});
      }
      return resp.json({status:200, data:rows, success:true});
      // return resp.json(rows);
    });
  } catch (error){
    return resp.json({
      status: 400,
      success: false,
    });
  }
});

app.get("/notes", (req, resp) => {
  const sql = 'select * from notes';
  try{
    db.all(sql, [], (err, rows) => {
      if(err){
        return resp.json({status: 300, success: false, error:err});
      }
      if(rows.length < 1){
        return resp.json({status: 300, success: false, error:"no records"});
      }
      return resp.json({status:200, data:rows, success:true});
      // return resp.json(rows);
    });
  } catch (error){
    return resp.json({
      status: 400,
      success: false,
    });
  }
});

app.get("/wallets", (req, resp) => {
  const sql = 'select * from wallets';
  try{
    db.all(sql, [], (err, rows) => {
      if(err){
        return resp.json({status: 300, success: false, error:err});
      }
      if(rows.length < 1){
        return resp.json({status: 300, success: false, error:"no records"});
      }
      return resp.json({status:200, data:rows, success:true});
      // return resp.json(rows);
    });
  } catch (error){
    return resp.json({
      status: 400,
      success: false,
    });
  }
});

app.patch('/updatepassword', (req, resp)=>{
  const sql = "UPDATE passwords SET name=?, website=?, username=?, password=?, notes=? WHERE id=?";
  const {name, website, username, password, notes, id} = req.body;
  try{
    console.log(name);
    db.run(sql, [name, website, username, password, notes, id], (err)=>{
      if(err){
        return resp.json({status:300, success:false, error:err})
      }
      console.log("Updated successfully");
    });
    return resp.json({
      status:200,
      success:true
    });
  } catch (error){
    return resp.json({
      status:400,
      success: false
    });
  }
});

app.post('/newpassword', (req, resp)=>{
  const sql = "INSERT INTO passwords (name, website, username, password, notes) values(?, ?, ?, ?, ?)";
  const {name, website, username, password, notes} = req.body;
  console.log(name);
  try{
    db.run(sql, [name, website, username, password, notes], (err)=>{
      if(err){
        return resp.json({status:300, success: false, error:err});
      }
      console.log("Successful input ", name);
    });
    return resp.json({
      status:200,
      success: true
    });
  } catch (error) {
    return resp.json({
      status:400,
      success:false,
    });
  }
});

app.delete('/password/:id', (req, resp)=>{
  try{
    const sql = "DELETE FROM passwords WHERE id = ?";
    db.run(sql, req.params.id, (err)=>{
      if(err){
        return resp.json({
          status:300,
          success:false,
          error:err
        });
      }
      console.log("Successfully deleted record ", req.params.id);
    });
    return resp.json({
      status:200,
      success:true
    });
  } catch (error){
    return resp.json({
      status:400,
      success: false
    });
  }
});