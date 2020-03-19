import 'dotenv/config';
import cronJob from 'node-cron';
import moment from 'moment';
import request from "request";
import db from '../models';
import * as dbHelper from '../helpers/dbQueries';
import { DAYS_TO_NOTIFY } from '../constants/vaccin';
import { callback, options } from './sendSmsUsingPindo';

// */1 * * * * *

const job = cronJob.schedule('25 23 * * *', async () => {
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
        const newVaccinDate = moment(vaccinDate).format("dddd, MMMM Do YYYY");
        const days = moment().diff(vaccin.get().vaccinationDate, 'days');
        const absoluteValue = Math.abs(days);
        const child = vaccin.get().child.get();
        const parents = child.parents.map(parent => parent.get());
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
        } else if (absoluteValue > DAYS_TO_NOTIFY) {
            parents.forEach((parent, index) => {
                console.log(`${parent.firstName} will receive a messages three 
                days and two days before their child ${child.firstName} receives their vaccines`)
            })
        } else if (absoluteValue < DAYS_TO_NOTIFY - 1) {
            console.log('Save vaccinated children');
        } else {
            console.log('No children with parents found....');
        }
    });


    console.log(`You will see this message every 01 seconds`);

}, null, true, 'Africa/Kigali');
//job.start();
job.stop();

module.exports = { job };
