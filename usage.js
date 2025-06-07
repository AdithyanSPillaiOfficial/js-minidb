const db = require('./index');

db.createDatabase('mydb');
db.createCollection('mydb', 'users');

const id = db.insertOne('mydb', 'users', { name: 'Adithyan', age: 22 });
console.log('Inserted ID:', id);

console.log('Find:', db.find('mydb', 'users', { name: 'Adithyan' }));

db.deleteOne('mydb', 'users', { _id: id });
db.updateOne('school', 'students', { name: 'Asha' }, { grade: 'A+' });


db.insertOne("ScriptX", "ticket", {user : "Dex Byte", description : "I need help"});
db.insertOne("ScriptX", "ticket", {user : "Adithyan S Pillai", description: "Bug Report"});
const last = db.find("ScriptX","ticket");
console.log(last);