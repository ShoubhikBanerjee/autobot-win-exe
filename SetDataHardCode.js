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


var data = {
    "app_config": [
        {
            "custom_dir": [{
                "dir_name": "B4B website",
                "dir_path": "D:\\Web Projects\\B4B Projects\\company-website2"
            }, {
                "dir_name": "B4B Combined Nlp Demo",
                "dir_path": "D:\\Web Projects\\B4B Projects\\combined_nlp_demo"
            }, {
                "dir_name": "Pandoora Food V1",
                "dir_path": "D:\\Web Projects\\panDoora\\food_v1"
            }, {
                "dir_name": "Pandoora Enterprise V1",
                "dir_path": "D:\\Web Projects\\panDoora\\enterprise_v1"
            }, {
                "dir_name": "Pandoora Delivery Partner V1",
                "dir_path": "D:\\Web Projects\\panDoora\\delivery_partner_v1"
            }, {
                "dir_name": "My Web Resume",
                "dir_path": "D:\\Personal\\my_web_resume"
            }, {
                "dir_name": "Autobot Intent Handler",
                "dir_path": "D:\\Personal\\Project_AutoBot\\Autobot_IntentHandler"
            }, {
                "dir_name": "Autobot Windows App",
                "dir_path": "D:\\Personal\\Project_AutoBot\\windows_app"
            }],
            "stop_command": "null",
            "app_name": "vs_code",
            "start_command": "code ."
        },
        {
            "stop_command": "null",
            "app_name": "skype",
            "start_command": "start skype"
        },
        {
            "stop_command": "null",
            "app_name": "default_browser",
            "start_command": "start https://www.google.com"
        },
        {
            "stop_command": "null",
            "app_name": "b4b_email",
            "start_command": "start https://mail.zoho.com"
        },
        {
            "stop_command": "null",
            "app_name": "hexa_email",
            "start_command": "cd \"C:\\Program Files\\Zoho Mail - Desktop\" && start \"\" \"Zoho Mail - Desktop\""
        },
        {
            "stop_command": "null",
            "app_name": "notepad_pp",
            "start_command": "start notepad++"
        },
        {
            "stop_command": "null",
            "app_name": "lock_windows",
            "start_command": "rundll32.exe user32.dll,LockWorkStation"
        }
    ],
    "app_trigger_config": {
        "hexa_email": false,
        "lock_windows": false,
        "default_browser": false,
        "vs_code": false,
        "b4b_email": false,
        "skype": false,
        "notepad_pp": false
    },
    "device_name": "personal_laptop",
    "temp_value_custom_dir": "null"
}

const cityRef = db.collection('autobot-device-handler').doc('personal_laptop');

const res = cityRef.set(data)