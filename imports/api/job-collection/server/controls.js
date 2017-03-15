import SLAs_Jobs from '../collections';
import {check} from 'meteor/check';

const JobServer = {
  start: () => SLAs_Jobs.startJobServer(),
  stop: () => SLAs_Jobs.shutdownJobServer(),
};

export default JobServer