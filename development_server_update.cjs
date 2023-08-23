const exec = require('child_process').exec; // this hurts me


const runCommand = (command) => new Promise((resolve, reject) => {
    exec(command, (error, out, err) => {
        if (error) {
            console.log("Error!", error);
            return reject(error);
        }
        if (err) {
            console.log("STDERR!", err);
            return resolve(err);
        }
        console.log("STDOUT", out);
        resolve(out);
    });
});

const setupAndRestart = async() => {
    await runCommand("pm2 stop 0");
    await runCommand("pm2 stop 1");
    await runCommand("pm2 stop 2");

    await runCommand("git pull");
    await runCommand("npm i --legacy-peer-deps");
    await runCommand("npm run build");

    await runCommand("pm2 start 0");
    await runCommand("pm2 start 1");
    await runCommand("pm2 start 2");
}

const checkForUpdate = async(check = true) => {
    var res = "Your branch is behind 'origin/master'";

    if (check) {
        await runCommand("git remote update");
        res = await runCommand("git status -uno");
    }

    if (res.includes("Your branch is behind 'origin/master'")) {
        console.log("Found update on master branch! Attempting to upgrade");
        try {
            await setupAndRestart();
            console.log("Successful restart!");
            process.exit(0);
        } catch (err) {
            console.log("Something went wrong while setting up the new update. Trying again in 5 seconds");
            return false;
        }
    }

    return true;
}

(async() => {
    var check = true;

    while (true) {
        const res = await checkForUpdate(check);
        if (!res) {
            await new Promise(resolve => setTimeout(resolve, 5000));
            check = false;
            continue;
        }

        check = true;
        await new Promise(resolve => setTimeout(resolve, 25000));
    }
})();