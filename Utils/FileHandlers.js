var fs = require('fs');
module.exports.saveInitialAppTriggerConfig = function (json_config) {
    fs.writeFileSync('AppTriggerConfig.json', json_config, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    return true;
}

module.exports.readInitialAppTriggerConfig = function () {
    try {
        const data = fs.readFileSync('AppTriggerConfig.json', { encoding: 'utf8', flag: 'r' });
        console.log(data)
        return data;
    } catch (error) {
        console.error("Error in reading previous AppTriggerConfig File" + error.toString());
        return null;
    }

}

