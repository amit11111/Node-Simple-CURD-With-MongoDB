const ChangeVersions = require(`${global.appRoot}/src/api/schedule/task/ChangeVersions`);

class schedule {
    static async run() {
        ChangeVersions.run();
    }
}

module.exports = schedule;
