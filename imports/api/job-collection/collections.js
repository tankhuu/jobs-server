/**
 * Job collections definitions
 */
import {JobCollection} from 'meteor/vsivsi:job-collection';

// SLAs Jobs collections
const SLAs_Jobs = new JobCollection('slas');

SLAs_Jobs.allow({
  // The "admin" below represents
  // the grouping of all remote methods
  admin: function (userId, method, params) {
    return true;
  }
});

export default SLAs_Jobs