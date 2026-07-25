const { Queue } = require('bullmq');
const Redis = require('ioredis');

// Connect to Redis
const connection = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379', {
  maxRetriesPerRequest: null,
});

// Create Mail Queue
const mailQueue = new Queue('MailQueue', { connection });

const MailQueueService = {
  async enqueueResetPassword(toEmail, token) {
    return mailQueue.add('sendResetPasswordEmail', { toEmail, token }, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 1000 },
      removeOnComplete: true,
      removeOnFail: false
    });
  },

  async enqueueSetPasswordInvite(toEmail, token, name) {
    return mailQueue.add('sendSetPasswordInviteEmail', { toEmail, token, name }, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 1000 },
      removeOnComplete: true,
      removeOnFail: false
    });
  },

  async enqueueEmailVerification(toEmail, token) {
    return mailQueue.add('sendEmailVerification', { toEmail, token }, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 1000 },
      removeOnComplete: true,
      removeOnFail: false
    });
  },

  async enqueueInvoiceEmail(toEmail, orderDetails) {
    return mailQueue.add('sendInvoiceEmail', { toEmail, orderDetails }, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 2000 },
      removeOnComplete: true,
      removeOnFail: false
    });
  },

  async enqueuePaymentSuccessEmail(toEmail, orderDetails) {
    return mailQueue.add('sendPaymentSuccessEmail', { toEmail, orderDetails }, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 2000 },
      removeOnComplete: true,
      removeOnFail: false
    });
  }
};

module.exports = {
  mailQueue,
  connection,
  MailQueueService
};
