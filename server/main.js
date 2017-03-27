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
  let types = SLAs_Jobs.find({}, {fields: {type: true}})
      .fetch()
      .map(type => type.type)
    ;
  types = _.uniq(types);
  types.map(type => {
    console.log(`processing job: ${type}`);
    SLAs_Jobs.processJobs(type, Workers.execute);
  });
  
  // const adminUser = Accounts.users.findOne({})
});