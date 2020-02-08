import dotenv from 'dotenv';
import mailer from '@sendgrid/mail';

import * as template from './templates';

dotenv.config();

export default async (to, action, data) => {
  const { SENDGRID_API_KEY, NODE_ENV } = process.env;

  mailer.setApiKey(SENDGRID_API_KEY);

  const notifier = template[action](data);

  const message = {
    to,
    from: 'vaccin@gmail.com',
    subject: 'Hospital management',
    text: 'Hospital management',
    html: `<div style="background:#e5eeff;width:100%;padding:20px 0;">
          <div style="max-width:760px;margin:0 auto;background:#ffffff">
          <div style="background:##9e9e9e;padding:20px;color:#ffffff;text-align:left;font-size:34px">
           <p style="margin-left: 18px;padding-top: 19px;">Hospital management</p>
          </div>
          <div style="padding:20px;text-align:left;">
          ${notifier.html}
          </div>
          <br>

          <div style="padding:20px;text-align:left;">
          <b>TLR-Vaccin Company</b>
          </div>
          </div>
          <div style="padding:35px 10px;text-align:center;">
          Copyright, 2020<br>
            Hospital Management
          </div>
          </div>`
  };
  return NODE_ENV === 'test' ? true : mailer.send(message);
};
