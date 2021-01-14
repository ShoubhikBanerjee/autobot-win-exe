const { exec, spawn } = require('child_process');
module.exports.executeCommand = function (command) {
    console.log("In execute commad : ", command)
    try {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(stdout);
        });
        console.log(process.env["USERPROFILE"])
        exec(command, {
            shell: true,
            env: {
                name: "HOME",
                value: process.env["USERPROFILE"] // service is now able to access the user who created its' home directory
            }
        }, (err, stdout, stderr) => {
            if (err) {
                console.error("error in executing command : ", err);
                return;
            }
            if (stderr) {
                console.error("error in executing command stderr : ", stderr);
                return;
            }
            console.log("Command executed successfully  : ", command);
            console.log("stdout  : ", stdout);
            // process.exit(0);
        });

        
    } catch (error) {
        console.log(error)

    }

}