/**
 * Workers definitions
 */
import {DDP} from 'meteor/ddp-client';
import {Meteor} from 'meteor/meteor';

const Workers = {};

Workers.test = function (job, cb) {
  console.log('job runned: ', new Date());
  job.done();
  cb();
};
/**
 * Function execute job in server side of job server
 * @param job
 * @param callback
 */
Workers.execute = function(job, callback) { // cb could be used to monitor the checking SLA process
  const {method = 'bots.elastic'} = job.data; // all information which need to call API/Methods

  try {
    const {host, port} = Meteor.settings.clients.bots;
    const BotsServer = DDP.connect(`http://${host}:${port}`);
    let result = {};
    BotsServer.call(method, {data: job.data}, (err, res) => {
      if(err) {
        job.log(`EXECUTE_BOT_FAIELD: ${err.reason}`, {level: 'danger'})
        job.fail();
        callback();
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