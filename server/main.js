import {Meteor} from 'meteor/meteor';
import '/imports/startup/server';

import Controllers from '/imports/api/job-collection/controllers';
import Workers from '/imports/api/job-collection/workers';
import {JobCollection, Job} from 'meteor/vsivsi:job-collection';
import {later} from 'meteor/mrt:later';

// job collections

import JobServer from '/imports/api/job-collection/server/controls';

Meteor.startup(function() {
  // start job server
  // JobServer('vn').start();
  // JobServer('kh').start();
  // JobServer('la').start();

  const JC = new JobCollection('myJob', {noCollectionSuffix: true});
  const type = 'testjob';
  if(JC.find({type}).count() === 0) {
    const job = new Job(JC, type, {});
    job.repeat({
      repeats: Job.forever,
      schedule: later.parse.text('every 3 minutes'),
    })
      .save()
    ;
  }

  const worker = (job, cb) => {
    console.log(`run: ${new Date()}`);
    job.done();
  };

  JC.startJobServer();
  JC.processJobs(type, worker);


  // const JC = SLA_Jobs.VN;
  // JC.startJobServer();
  // const type = 'testjob';
  // if (JC.find({type}).count() === 0) {
  //   const job = new Job(JC, type, {});
  //   job.repeat({
  //     repeats: Job.forever,
  //     schedule: later.parse.text('every 2 minutes')
  //   })
  //     .save();
  // }
  //
  // const worker = (job, cb) => {
  //   console.log(job.data);
  //   console.log(`run: ${new Date()}`);
  //   job.done();
  // };
  //
  // JC.processJobs(type, worker);
});