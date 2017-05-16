import {Job} from 'meteor/vsivsi:job-collection';
import SLAs_Jobs from './collections';
import Workers from './workers';
import _ from 'lodash';
import {Promise} from 'meteor/promise';
import moment from 'moment';

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
    {} = data
    ;

  try {
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

    return SLAs_Jobs.processJobs(type, Workers.execute);
  } catch (err) {
    throw new Meteor.Error('SLAJob.create', err.message);
  }
};

export const pauseJobs = (type) => {
  const ids = SLAs_Jobs
    .find({type, status: {$in: Job.jobStatusPausable}}, {fields: {_id: 1}})
    .fetch()
    .map(j => j._id)

  if (!_.isEmpty(ids)) {
    try {
      return SLAs_Jobs.pauseJobs(ids);
    } catch (err) {
      throw new Meteor.Error('SLAJob.cancel', err.message);
    }
  } else {
    return true;
  }
};

export const resumeJobs = (type) => {
  const ids = SLAs_Jobs
    .find({type, status: "paused"}, {fields: {_id: 1}})
    .fetch()
    .map(j => j._id)

  if (!_.isEmpty(ids)) {
    try {
      return SLAs_Jobs.resumeJobs(ids);
    } catch (err) {
      throw new Meteor.Error('SLAJob.cancel', err.message);
    }
  } else {
    return true;
  }
};

export const restartJobs = (type) => {
  const ids = SLAs_Jobs
    .find({type, status: {$in: Job.jobStatusRestartable}}, {fields: {_id: 1}})
    .fetch()
    .map(j => j._id)

  if (!_.isEmpty(ids)) {
    try {
      return SLAs_Jobs.restartJobs(ids);
    } catch (err) {
      throw new Meteor.Error('SLAJob.cancel', err.message);
    }
  } else {
    return true;
  }
};

export const cancelJobs = (type) => {
  const ids = SLAs_Jobs
    .find({type, status: {$in: Job.jobStatusCancellable}}, {fields: {_id: 1}})
    .fetch()
    .map(j => j._id)

  if (!_.isEmpty(ids)) {
    try {
      return SLAs_Jobs.cancelJobs(ids);
    } catch (err) {
      throw new Meteor.Error('SLAJob.cancel', err.message);
    }
  } else {
    return true;
  }
};

export const readyJobs = (type) => {
  const ids = SLAs_Jobs
    .find({type, status: 'waiting'}, {fields: {_id: 1}})
    .fetch()
    .map(j => j._id)

  if (!_.isEmpty(ids)) {
    try {
      return SLAs_Jobs.readyJobs(ids, {force: true});
    } catch (err) {
      throw new Meteor.Error('SLAJob.ready', err.message);
    }
  } else {
    return true;
  }
};

export const removeJobs = (type) => {
  const ids = SLAs_Jobs
    .find({type, status: {$in: Job.jobStatusRemovable}}, {fields: {_id: 1}})
    .fetch()
    .map(j => j._id)

  if (!_.isEmpty(ids)) {
    try {
      return SLAs_Jobs.removeJobs(ids);
    } catch (err) {
      throw new Meteor.Error('SLAJob.remove', err.message);
    }
  } else {
    return true;
  }
};

export const removeExpiredJobs = () => {
  const
    today = new Date(),
    {duration, unit} = Meteor.settings.admin.cleanup.jobs,
    cleanupDate = moment(today)
      .subtract(duration, unit);
  const selector = {
    createdAt: {$lt: new Date(cleanupDate)},
    status: { $in: Job.jobStatusRestartable }
  };
  try {
    const removed = SLAs_Jobs.remove(selector);
    return removed;
  } catch(err) {
    throw new Meteor.Error('removeExpiredJobs', err.message);
  }
};