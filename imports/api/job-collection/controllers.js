import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ValidationError} from 'meteor/mdg:validation-error';
import {Job} from 'meteor/vsivsi:job-collection';
import {later} from 'meteor/mrt:later';

// job collections
import SLA_Jobs from './collections';

const Controllers = {};

Controllers.create = new ValidatedMethod({
  name: 'controllers.create',
  validate: null,
  run({country, type, attributes, data}) {
    const
      jcName = country.toUpperCase(),
      {
        depends = [],
        priority = 'normal',
        retry = {},
        repeat = {
          schedule: later.parse.text('every 30 seconds')   // Rerun this job every day at 6:00 AM
        },
        delay = 0,
        after = new Date()
      } = attributes
      ;

    const job = new Job(SLA_Jobs[jcName], type, data);
    job
      .depends(depends)
      .priority(priority)
      .retry(retry)
      .repeat(repeat)
      .delay(delay)
      .after(after)
      .save()
    ;

    return {};
  }
});

Controllers.edit = new ValidatedMethod({
  name: 'controllers.edit',
  validate: null,
  run({}) {
    // jobs = AdminJobs.find({type, status: {$in: AdminJobs.jobStatusCancellable}}, {
    //   fields: {
    //     _id: true,
    //     status: true
    //   }
    // }).fetch();
    // if (_.isEmpty(jobs)) {
    //   // console.log(`create new job ${type}`)
    //   message = Jobs.create(type, attributes, data);
    //   AdminJobs.processJobs(type, worker);
    //   return {message}; // return new job id
    // } else {
    //   jobs.map(job => {
    //     if (job.status === "running") {
    //       message = "running";
    //       return {message}; // job running, couldn't update
    //     } else {
    //       status = AdminJobs.cancelJobs([job._id]);
    //       if (status) {
    //         // console.log(`cancel job, create new job`)
    //         // cancel job success, create new job with new attributes
    //         message = Jobs.create(type, attributes, data);
    //         AdminJobs.processJobs(type, worker);
    //         return {message}; // return new job id
    //       } else {
    //         message = "failed";
    //         return {message}; // update job failed
    //       }
    //     }
    //   });
    // }
  }
});

export default Controllers