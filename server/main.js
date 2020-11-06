import {Meteor} from 'meteor/meteor';
import '/imports/startup/server';
import _ from 'lodash';
import {Accounts} from 'meteor/accounts-base';

// job collections
import SLAs_Jobs from '/imports/api/job-collection/collections';
import JobServer from '/imports/api/job-collection/server/controls';
import Workers from '/imports/api/job-collection/workers';

Meteor.startup(function () {
  // start job server
  JobServer.start();

  // reprocess all jobs in server
  // let types = SLAs_Jobs.find({}, {fields: {type: true}})
  //     .fetch()
  //     .map(type => type.type)
  //   ;
  // types = _.uniq(types);
  // types.map(type => {
  //   if(type.split('-')[0] !== 'admin') {
  //     console.log(`processing job: ${type}`);
  //     SLAs_Jobs.processJobs(type, Workers.execute);
  //   }
  // });
  
  // // const adminUser = Accounts.users.findOne({})
  // /* Job cleanup indices */
  // if (Meteor.settings.admin.cleanup.jobs.enable) {
  //   const {frequency: freqText} = Meteor.settings.admin.cleanup.jobs;
  //   const type = 'admin-cleanupJobs';
  //   const noJobs = SLAs_Jobs.find({type}).count();

  //   if(noJobs === 0) {
  //     const
  //       depends = [],
  //       priority = 'normal',
  //       retry = {},
  //       repeat = {
  //         schedule: later.parse.text(freqText)
  //       },
  //       delay = 0,
  //       after = new Date();

  //     try {
  //       const job = new Job(SLAs_Jobs, type, {});
  //       job
  //         .depends(depends)
  //         .priority(priority)
  //         .retry(retry)
  //         .repeat(repeat)
  //         .delay(delay)
  //         .after(after)
  //         .save()
  //       ;
  //     } catch (err) {
  //       throw new Meteor.Error('CREATE_CLEANUP_JOBS', err.message);
  //     }
  //   }
  //   SLAs_Jobs.processJobs(type, Workers.cleanupJobs);
  // }
});