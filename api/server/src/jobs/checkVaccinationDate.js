import 'dotenv/config';
import cronJob from 'node-cron';

import db from '../models';
import * as dbHelper from '../helpers/dbQueries';
import { DAYS_TO_NOTIFY } from '../constants/vaccin';

const job = cronJob.schedule('*/1 * * * * *', async () => {
    const allVaccins = await dbHelper.findAll({
        model: db.Vaccin,
        include: [{
            model: db.Child,
            as: 'child',
            include: [{ model: db.Parent, as: 'parents' }]
        }]
    });

    allVaccins.forEach(vaccin => {
        const days = DAYS_TO_NOTIFY || moment().diff(vaccin.get().vaccinationDate, 'days');
        if (days >= (DAYS_TO_NOTIFY - 1) && days <= DAYS_TO_NOTIFY) {
            const child = vaccin.get().child.get();
            const parents = child.parents.map(parent => parent.get());
            console.log('=======open');
            console.log('child :', child);
            parents.forEach((parent, index) => {
                console.log(`parent ${index}:`, parent);
            })
            console.log('========end');
        }
    });
    console.log(`You will see this message every 01 seconds`);

}, null, true, 'America/Los_Angeles');
// job.start();
job.stop();

export default job;