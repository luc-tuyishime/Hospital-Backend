import 'dotenv/config';
import cronJob from 'node-cron';
import moment from 'moment';
import request from "request";
import db from '../models';
import * as dbHelper from '../helpers/dbQueries';
import { DAYS_TO_NOTIFY, DAYS_TO_NOTIFY2 } from '../constants/vaccin';
import { callback, options } from './sendSmsUsingPindo';


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
        console.log('remanaing days ==>', moment().diff(vaccin.get().vaccinationDate, 'days'));
        const days = DAYS_TO_NOTIFY || moment().diff(vaccin.get().vaccinationDate, 'days');
        if (days >= (DAYS_TO_NOTIFY - 1) && days <= DAYS_TO_NOTIFY2) {
            const child = vaccin.get().child.get();
            const parents = child.parents.map(parent => parent.get());
            console.log('=======open');
            console.log('child :', child);
            parents.forEach((parent, index) => {
                const values = options({
                    to: parent.phone,
                    text: `Hello ${parent.firstName}, your child ${child.firstName} ${child.lastName} will receive his vaccin in ${days} days`,
                    sender: 'HIhi..'
                });
                console.log(`parent ${index}:`, parent);

                return request(values, callback);
            })
            console.log('========end');
        }
    });


    console.log(`You will see this message every 01 seconds`);

}, null, true, 'America/Los_Angeles');
//job.start();
job.stop();


module.exports = { job };
