/**
 * Job collections definitions
 */
import {JobCollection} from 'meteor/vsivsi:job-collection';

const SLA_Jobs = {};

// Vietnam SLA Job collections
SLA_Jobs.VN = new JobCollection('vn_slas', {noCollectionSuffix: true});

// Cambodia SLA Job collections
SLA_Jobs.KH = new JobCollection('kh_slas', {noCollectionSuffix: true});

// Laos SLA Job collections
SLA_Jobs.LA = new JobCollection('la_slas', {noCollectionSuffix: true});

export default SLA_Jobs