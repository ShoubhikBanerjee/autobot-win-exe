// const { app } = require('electron');


function showWindow() {
    console.log("1")
    try {
        const { exec, spawn } = require('child_process');
        exec('cd /D D:\\Web Projects\\panDoora\\food_v1 code .', {
            stdio: 'inherit',
            shell: true
        }, (err, stdout, stderr) => {
            console.log("2")
            if (err) {
                console.log("3")
                console.error(err);
                return;
            }
            if (stderr) {
                console.log("41")
                console.error(stderr);
                return;
            }
            console.log("4")
            console.log(stdout);
            // process.exit(0);
        });


    } catch (error) {
        console.log(error)

    }

    // try {
    //     const { spawn } = require('child_process');
    //     const child = spawn('start', ['Skype']);
    //     child.on('exit', function (code, signal) {
    //         console.log('child process exited with ' +
    //             `code ${code} and signal ${signal}`);
    //     });
    // } catch (error) {
    //     console.log(error)
    // }






}

// function abc() {
//     var ipc = require('electron').ipcMain;
//     ipc.on('invokeAction', function (event, data) {
//         console.log("Received data in test.js => ", data)
//         var result = "I received your data in test.js";
//         event.sender.send('actionReply', result);
//     });
// }



// app.on('ready', showWindow);
// app.on('ready', abc);
// // Quit when all windows are closed.
// app.on('window-all-closed', () => {
//     app.quit();
// });

showWindow()