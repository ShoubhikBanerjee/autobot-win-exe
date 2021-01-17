var fs = require('fs');
const { executeCommand } = require('../ExecuteCommand');
const { saveInitialAppTriggerConfig, readInitialAppTriggerConfig } = require('../Utils/FileHandlers');


module.exports.handleCommand = function (new_json_string) {
    console.log(new_json_string);
    var new_trigger_command_config_json = JSON.parse(new_json_string).app_config;
    var initial_config = readInitialAppTriggerConfig()
    saveInitialAppTriggerConfig(new_json_string)
    if ((initial_config !== undefined) || (initial_config !== null)) {
        var initial_json_config = JSON.parse(initial_config)
        var initial_app_trigger_config = initial_json_config.app_trigger_config;
        var new_app_trigger_config = JSON.parse(new_json_string).app_trigger_config;
        var temp_value_custom_dir_new_json_string = JSON.parse(new_json_string).temp_value_custom_dir;
        var new_app_tirgger_config_keys = Object.keys(new_app_trigger_config)
        var new_app_tirgger_config_keys_cattered = []
        for (var key in initial_app_trigger_config) {
            console.log("key => ", key);
            if (new_app_trigger_config.hasOwnProperty(key)) {
                var new_trigger_value = new_app_trigger_config[key];
                var initial_trigger_value = initial_app_trigger_config[key];
                console.log("new_trigger_value => ", new_trigger_value);
                console.log("initial_trigger_value => ", initial_trigger_value);
                new_app_tirgger_config_keys_cattered.push(key)
                if (new_trigger_value !== initial_trigger_value) {
                    handleTriggerCommand(key, new_trigger_value,temp_value_custom_dir_new_json_string)
                } else {
                    // New tgrigger value and old trigger value is same, so skipping it
                }
            }
        }

        var skipped_keys_from_new_config = arr_diff(new_app_tirgger_config_keys_cattered, new_app_tirgger_config_keys)
        console.log("Skipped keys : ",skipped_keys_from_new_config )
        if (skipped_keys_from_new_config.length > 0) {
            skipped_keys_from_new_config.forEach(each_skipped_key => {
                handleTriggerCommand(each_skipped_key, new_app_trigger_config[each_skipped_key], temp_value_custom_dir_new_json_string)
            });
        }
    } else {
        console.error("Skipping this instruction completely as initial_config => ", initial_config);
    }


    function arr_diff(a1, a2) {
        var a = [], diff = [];
        for (var i = 0; i < a1.length; i++) {
            a[a1[i]] = true;
        }
        for (var i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                delete a[a2[i]];
            } else {
                a[a2[i]] = true;
            }
        }
        for (var k in a) {
            diff.push(k);
        }
        return diff;
    }

    function handleTriggerCommand(command_key, command_value, temp_value_custom_dir_new_json_string) {
        console.log("command_key => ", command_key)
        console.log("command_value => ", command_value)
        if (command_value === true) {
            console.log("Command value is true.")
            var start_command = "null"
            new_trigger_command_config_json.forEach(element => {
                console.log("Element => ", element)
                console.log("element.app_name => ", element.app_name)
                console.log("command_key => ", command_key)
                var command_prefix = ""
                if (element.hasOwnProperty("custom_dir")){
                    if (element.custom_dir.length > 0){
                        element.custom_dir.forEach(element_custom_dir => {
                            console.log("element_custom_dir => ", element_custom_dir)
                            if(element_custom_dir.dir_name === temp_value_custom_dir_new_json_string){
                                command_prefix = "cd /D " + element_custom_dir.dir_path + " && "
                            }
                        });
                    }
                }
                if(element.app_name === command_key){
                    console.log("Matched...")
                    console.log("command found => ", element.start_command)
                    start_command = command_prefix + element.start_command
                }
            });
            // var cmd = new_trigger_command_config_json[command_key]
            console.log("Command to execute : ", start_command)
            executeCommand(start_command)
            // executeCommand("Start Skype")
        }
    }

};
