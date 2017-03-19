import {Job} from 'meteor/vsivsi:job-collection';
import SLAs_Jobs from './collections';
import Workers from './workers';
import _ from 'lodash';

export const getJobs = (type) => {
  return SLAs_Jobs.find({type}, {fields: {status: true}}).fetch();
};

export const createJob = (type, attributes, data) => {
  const
    {
      depends = [],
      priority = 'normal',
      retry = {},
      repeat = {
        schedule: later.parse.text('every 5 minutes')
      },
      delay = 0,
      after = new Date()
    } = attributes,
    {
      // API information
    } = data
    ;

  const job = new Job(SLAs_Jobs, type, data);
  job
    .depends(depends)
    .priority(priority)
    .retry(retry)
    .repeat(repeat)
    .delay(delay)
    .after(after)
    .save()
  ;

  SLAs_Jobs.processJobs(type, Workers.execute);

  return true;
};

export const pauseJobs = (type) => {
  const ids = SLAs_Jobs
    .find({type, status: { $in: Job.jobStatusPausable }}, { fields: { _id: 1 }})
    .fetch()
    .map(j => j._id)

  if(_.isEmpty(ids)) {
    return {message: `no job with type: ${type}`};
  }
  return SLAs_Jobs.pauseJobs(ids);
};

export const resumeJobs = (type) => {
  const ids = SLAs_Jobs
    .find({type, status: "paused" }, { fields: { _id: 1 }})
    .fetch()
    .map(j => j._id)

  if(_.isEmpty(ids)) {
    return {message: `no job with type: ${type}`};
  }
  return SLAs_Jobs.resumeJobs(ids);
};

export const restartJobs = (type) => {
  const ids = SLAs_Jobs
    .find({type, status: { $in: Job.jobStatusRestartable }}, { fields: { _id: 1 }})
    .fetch()
    .map(j => j._id)

  if(_.isEmpty(ids)) {
    return {message: `no job with type: ${type}`};
  }
  return SLAs_Jobs.restartJobs(ids);
};

export const cancelJobs = (type) => {
  const ids = SLAs_Jobs
    .find({type, status: { $in: Job.jobStatusCancellable }}, { fields: { _id: 1 }})
    .fetch()
    .map(j => j._id)

  if(_.isEmpty(ids)) {
    return {message: `no job with type: ${type}`};
  }
  return SLAs_Jobs.cancelJobs(ids);
};

export const removeJobs = (type) => {
  const ids = SLAs_Jobs
    .find({type, status: { $in: Job.jobStatusRemovable }}, { fields: { _id: 1 }})
    .fetch()
    .map(j => j._id)

  if(_.isEmpty(ids)) {
    return {message: `no job with type: ${type}`};
  }
  return SLAs_Jobs.removeJobs(ids);
};