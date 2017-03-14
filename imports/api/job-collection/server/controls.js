import SLA_Jobs from '../collections';
import S from 'string';
import {check} from 'meteor/check';

const JobServer = (country) => {
  check(country, String);
  const c = country.toUpperCase();

  return {
    start: () => SLA_Jobs[c].startJobServer(),
    stop: () => SLA_Jobs[c].shutdownJobServer(),
  };
};

export default JobServer