import CronJob from 'node-cron';
import { exec } from 'child_process';

const job = CronJob.schedule('*/10 * * * * *',
	async function() {
		exec('cd ./uploads && node index.js',
			(
				err,
				stdout,
			) => {
				if (err) {
					console.error(err);
					return;
				}
				console.log(stdout);
			});
	});

job.start();

export default job;