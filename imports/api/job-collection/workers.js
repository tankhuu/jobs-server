/**
 * Workers definitions
 */
import {DDP} from 'meteor/ddp-client';

const Workers = {};

Workers.test = function (job, cb) {
  console.log('job runned: ', new Date());
  job.done();
  cb();
};

Workers.execute = function(job, callback) { // cb could be used to monitor the checking SLA process
  const {method = 'bots.elastic', slaId} = job.data; // all information which need to call API/Methods

  try {
    /*
    console.log('call API', new Date());
    console.log('type', job.type);
    console.log('data', job.data);
    console.log('------------------');
    const result = {notify: true};
    */
    const BotsServer = DDP.connect('http://localhost:3000');
    let result = {};
    BotsServer.call(method, {slaId}, (err, res) => {
      if(err) {
        throw new Meteor.Error('EXECUTE_TEST_BOT_FAILED', err.reason);
      }
      result = res;
    });

    job.done(result);
    callback();
  } catch(e) {
    job.fail(e);
    callback();
  }
};

export default Workers