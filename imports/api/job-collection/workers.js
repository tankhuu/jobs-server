/**
 * Workers definitions
 */

const Workers = {};

Workers.test = function (job, cb) {
  console.log('job runned: ', new Date());
  job.done();
  cb();
};

Workers.execute = function(job, callback) { // cb could be used to monitor the checking SLA process
  const {} = job.data; // all information which need to call API/Methods

  try {
    // todo
    // call the API or Methods
    console.log('call API', new Date());
    console.log('type', job.type);
    console.log('data', job.data);
    console.log('------------------');
    const result = {notify: true};
    job.done(result);
    callback();
  } catch(e) {
    job.fail(e);
    callback();
  }
};

export default Workers