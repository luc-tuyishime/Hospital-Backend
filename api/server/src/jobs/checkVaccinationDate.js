import 'dotenv/config';
import cronJob from 'node-cron';
import moment from 'moment';
import request from "request";
import db from '../models';
import * as dbHelper from '../helpers/dbQueries';
import { DAYS_TO_NOTIFY } from '../constants/vaccin';
import { callback, options } from './sendSmsUsingPindo';
import { SaveChildren } from '../queries';

// */1 * * * * *
// 25 23 * * 1-3

const job = cronJob.schedule('*/10 * * * * *', async () => {
    const allVaccins = await dbHelper.findAll({
        model: db.Vaccin,
        include: [{
            model: db.Child,
            as: 'child',
            include: [{ model: db.Parent, as: 'parents' }]
        }]
    });

    allVaccins.forEach(vaccin => {
        console.log(vaccin);
        const vaccinDate = vaccin.vaccinationDate;
        const newVaccinDate = moment(vaccinDate).format("DD, YYYY-MM-DD");
        const days = moment().diff(vaccin.get().vaccinationDate, 'days');
        const absoluteValue = Math.abs(days);
        const child = vaccin.get().child.get();
        const parents = child.parents.map(parent => parent.get());
        const date1 = moment(vaccinDate).format("YYYY-MM-DD");
        const date2 = moment().format("YYYY-MM-DD");
        console.log('last', date1, date2);
        if (absoluteValue >= (DAYS_TO_NOTIFY - 1) && absoluteValue <= DAYS_TO_NOTIFY) {
            console.log('=======open');
            console.log('childooooo ===>> :', child.parents);
            parents.forEach((parent, index) => {
                const values = options({
                    to: parent.phone,
                    text: `Hello ${parent.firstName}, your child ${child.firstName} 
                    ${child.lastName} will receive ${vaccin.type} as a vaccine on 
                    ${newVaccinDate} which means in ${absoluteValue} days`,
                    sender: '...JL...'
                });
                console.log(`parent ${index}:`, parent);

                return request(values, callback);
            })
            console.log('========end');
        } if (moment(date1).isSameOrBefore(date2, 'year')) {
            parents.forEach(async (parent) => {
                const savedChildren = await SaveChildren.save(child.userId, child.firstName, child.lastName,
                    child.birth, child.sex);

                if (savedChildren.errors) {
                    return console.log('Oops, something went wrong, please try again!')
                }

                return console.log('Children saved successfully')
            })
        }
    });


    console.log(`You will see this message every 01 seconds`);

}, null, true, 'Africa/Kigali');
//job.start();
job.stop();

module.exports = { job };
