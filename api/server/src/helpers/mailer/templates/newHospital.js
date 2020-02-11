import 'dotenv/config';

export default ({ name, firstName }) => {
  const message = {};

  message.html = `Welcome ${name} ${firstName} Hospital</br>,
  <p>
    You have just created a Hospital, we will send you further information.</br>
    <p>Once again Congratulations.</p>
    </a>
  </p>`;

  return message;
};
