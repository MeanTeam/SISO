
Main Project Folder SISO
mkdir SISOData

//mongod --dbpath C:\Users\Padma\Learning\SISO\SISOData
mongod --dbpath <Project Path>\SISOData
Another command window ---
mongo
use SISOData
db.siso.insert({'userpin' : '258237','email' : 'padmavathi.indukuri@test.com','fullname' : 'Padma Indukuri','phone' : '1231231234','location' : 'Building A','manager' : 'I MeSelf'})
https://docs.mongodb.org/manual/reference/mongo-shell/
