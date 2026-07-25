const { Worker } = require('bullmq');
const { connection } = require('./mail.queue');
const mailer = require('../utils/mailer');

const worker = new Worker('MailQueue', async (job) => {
  console.log(`[MailWorker] Processing job ${job.id} of type ${job.name}...`);
  const { toEmail, token, name, orderDetails } = job.data;

  try {
    switch (job.name) {
      case 'sendResetPasswordEmail':
        await mailer.sendResetPasswordEmail(toEmail, token);
        break;
      case 'sendSetPasswordInviteEmail':
        await mailer.sendSetPasswordInviteEmail(toEmail, token, name);
        break;
      case 'sendEmailVerification':
        await mailer.sendEmailVerification(toEmail, token);
        break;
      case 'sendInvoiceEmail':
        await mailer.sendInvoiceEmail(toEmail, orderDetails);
        break;
      case 'sendPaymentSuccessEmail':
        await mailer.sendPaymentSuccessEmail(toEmail, orderDetails);
        break;
      default:
        throw new Error(`Unknown job name: ${job.name}`);
    }
    console.log(`[MailWorker] Job ${job.id} completed successfully`);
  } catch (error) {
    console.error(`[MailWorker] Job ${job.id} failed:`, error);
    throw error;
  }
}, { connection });

worker.on('failed', (job, err) => {
  console.log(`[MailWorker] Job ${job.id} has failed with ${err.message}`);
});

console.log('[MailWorker] Initialized and listening for jobs...');

module.exports = worker;
