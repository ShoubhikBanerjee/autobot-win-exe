var fs = require('fs');
var admin = require("firebase-admin");
var serviceAccount = require("./Keys/auto-bot-3c17c-firebase-adminsdk-rsdhn-19b8c738ab.json");
const { handleCommand } = require('./CommandHandler/CommandHandler');
const { saveInitialAppTriggerConfig } = require('./Utils/FileHandlers');
var is_first_execution = true;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


const query = db.collection('autobot-device-handler').where('device_name', '==', 'personal_laptop');


const observer = query.onSnapshot(querySnapshot => {
    console.log(`Received query snapshot of size ${querySnapshot.size}`);
    var data = querySnapshot.docs[0].data()
    console.log("Data => ", JSON.stringify(data))
    saveLogToFile(JSON.stringify(data))
    if(is_first_execution){
        is_first_execution = false;
        saveInitialAppTriggerConfig(JSON.stringify(data))
    }else{
        handleCommand(JSON.stringify(data))
    }
    
    // ...
}, err => {
    console.log(`Encountered error: ${err}`);

});



function saveLogToFile(text) {
    fs.appendFile('out.txt', text + '\n', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

