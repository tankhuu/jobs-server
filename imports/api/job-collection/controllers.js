import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ValidationError} from 'meteor/mdg:validation-error';
import {Job} from 'meteor/vsivsi:job-collection';
import {later} from 'meteor/mrt:later';

// job collections
import SLAs_Jobs from './collections';
import Workers from './workers';

// functions
import {
  createJob,
  pauseJobs,
  resumeJobs,
  restartJobs,
  cancelJobs,
  removeJobs,
} from './functions';

const Controllers = {};

Controllers.create = new ValidatedMethod({
  name: 'controllers.create',
  validate: null,
  run({type, attributes, data}) {
    return createJob(type, attributes, data);
  }
});

Controllers.edit = new ValidatedMethod({
  name: 'controllers.edit',
  validate: null,
  run({type, attributes, data}) {
    const canceled = cancelJobs(type);
    if (canceled) {
      // create Job
      return createJob(type, attributes, data);
    } else {
      return false;
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

Controllers.cancel = new ValidatedMethod({
  name: 'controllers.cancel',
  validate: null,
  run({type}) {
    return cancelJobs(type);
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