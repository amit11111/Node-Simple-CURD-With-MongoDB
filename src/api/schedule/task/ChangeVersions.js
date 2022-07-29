const cron = require('node-cron');

class ChangeVersions {
	static async run() {
		// Run Every Day 12:00 AM
		cron.schedule('0 0 0 * * *', async () => {
		//
		}, {
			scheduled: true,
		});
	}
}

module.exports = ChangeVersions;
