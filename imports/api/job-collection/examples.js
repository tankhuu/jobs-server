// import Controllers from '/imports/api/job-collection/controllers';
// import Workers from '/imports/api/job-collection/workers';
// import {Job} from 'meteor/vsivsi:job-collection';
// import {later} from 'meteor/mrt:later';
//
// // job collections
// import SLA_Jobs from '/imports/api/job-collection/collections';
//
// const JC = SLA_Jobs.VN;
// JC.startJobServer();
// const type = 'testjob';
// if (JC.find({type}).count() === 0) {
//   const job = new Job(JC, type, {});
//   job.repeat({
//     repeats: Job.forever,
//     schedule: later.parse.text('every 30 seconds')
//   })
//     .save();
// }
//
// const worker = (job, cb) => {
//   console.log(`run: ${new Date()}`);
//   job.done();
// };
//
// export const queue = JC.processJobs(type, worker);