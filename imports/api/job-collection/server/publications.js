import {Meteor} from 'meteor/meteor';

// collections
import SLAs_Jobs from '../collections';

Meteor.publish('slas_jobs', function() {
  return SLAs_Jobs.find();
});
