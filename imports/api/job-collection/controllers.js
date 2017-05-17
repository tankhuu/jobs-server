import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ValidationError} from 'meteor/mdg:validation-error';
import {Job} from 'meteor/vsivsi:job-collection';
import {later} from 'meteor/mrt:later';
import {Meteor} from 'meteor/meteor';

// job collections
import SLAs_Jobs from './collections';
import Workers from './workers';

// functions
import {
  getJobs,
  createJob,
  pauseJobs,
  resumeJobs,
  restartJobs,
  cancelJobs,
  readyJobs,
  removeJobs,
} from './functions';

const Controllers = {};

Controllers.getJobs = new ValidatedMethod({
  name: 'controllers.getJobs',
  validate: null,
  run({type}) {
    return getJobs(type);
  }
});

Controllers.create = new ValidatedMethod({
  name: 'controllers.create',
  validate: null,
  async run({type, attributes, data}) {
    try {
      const result = await createJob(type, attributes, data);
      if(result) {
        return {_id: data.slaId};
      } else {
        throw new Meteor.Error('controllers.create', `Can't create job in Job Server.`);
      }
    } catch (err) {
      throw new Meteor.Error('controllers.create', err.message);
    }
  }
});

Controllers.edit = new ValidatedMethod({
  name: 'controllers.edit',
  validate: null,
  async run({type, attributes, data}) {
    try {
      const canceled = await cancelJobs(type);
      if (canceled) {
        // create Job
        const result = await createJob(type, attributes, data);
        if (result) {
          return {_id: data.slaId};
        } else {
          throw new Meteor.Error('controllers.edit', `Can't edit job in Job Server.`);
        }
      }
    } catch (err) {
      throw new Meteor.Error('controllers.edit', err.message);
    }
  }
});

Controllers.pause = new ValidatedMethod({
  name: 'controllers.pause',
  validate: null,
  run({type}) {
    return pauseJobs(type);
  }
});

Controllers.restart = new ValidatedMethod({
  name: 'controllers.restart',
  validate: null,
  run({type}) {
    return restartJobs(type);
  }
});

Controllers.resume = new ValidatedMethod({
  name: 'controllers.resume',
  validate: null,
  run({type}) {
    return resumeJobs(type);
  }
});

Controllers.ready = new ValidatedMethod({
  name: 'controllers.ready',
  validate: null,
  run({type}) {
    return readyJobs(type);
  }
});

Controllers.cancel = new ValidatedMethod({
  name: 'controllers.cancel',
  validate: null,
  run({type}) {
    return cancelJobs(type);
  }
});

Controllers.start = new ValidatedMethod({
  name: 'controllers.start',
  validate: null,
  async run({type, attributes, data}) {
    try {
      const canceled = await cancelJobs(type);
      if (canceled) {
        // create Job
        const result = await createJob(type, attributes, data);
        if (result) {
          return {_id: data.slaId};
        } else {
          throw new Meteor.Error('controllers.start', `Can't create job in Job Server.`);
        }
      }
    } catch (err) {
      throw new Meteor.Error('controllers.start', err.message);
    }
  }
});

Controllers.remove = new ValidatedMethod({
  name: 'controllers.remove',
  validate: null,
  run({type}) {
    const canceled = cancelJobs(type);
    if (canceled) {
      // remove Jobs
      return removeJobs(type);
    } else {
      return false;
    }
  }
});

export default Controllers