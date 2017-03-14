/**
 * Workers definitions
 */

const Workers = {};

Workers.test = function (job, callback) {
  console.log('job runned: ', new Date());
  job.done();
};

export default Workers