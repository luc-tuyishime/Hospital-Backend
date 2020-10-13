import 'dotenv/config';

export default ({ name }) => {
  const message = {};

  message.html = `Welcome ${name} Hospital</br>,
  <p>
    You have just created a Hospital, we will send you further information.</br>
    <p>Once again Congratulations.</p>
    </a>
  </p>`;

  return message;
};
