const functions = require('firebase-functions');
const axios = require('axios');

exports.verifyRecaptcha = functions.https.onCall(async (data, context) => {
  const recaptchaToken = data.token;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`
    );

    return {
      success: response.data.success,
      score: response.data.score
    };
  } catch (error) {
    throw new functions.https.HttpsError('internal', 'Verificarea reCAPTCHA a eșuat');
  }
});