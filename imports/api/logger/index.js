import {Meteor} from 'meteor/meteor';
import winston from 'winston';

const {vn, kh, la} = Meteor.settings.logger.file;

/**
 * Logger instance
 * @function error: [Function],
 * @function warn: [Function],
 * @function info: [Function],
 * @function verbose: [Function],
 * @function debug: [Function],
 * @function silly: [Function],
 */

// Using:
// import {Logger} from '/imports/api/logger/index';
// Logger.info({name: "migration", message: `Created new employee - employeeId: abc`});
const VN_SLAs_Logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      ...vn,
      filename: `${vn.filename}.error`,
      level: 'error',
    }),
    new (winston.transports.File)({
      ...vn,
      filename: `${vn.filename}.warn`,
      level: 'warn',
    }),
    new (winston.transports.File)({
      ...vn,
      filename: `${vn.filename}.info`,
      level: 'info',
    }),
  ]
});

const KH_SLAs_Logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      ...kh,
      filename: `${kh.filename}.error`,
      level: 'error',
    }),
    new (winston.transports.File)({
      ...kh,
      filename: `${kh.filename}.warn`,
      level: 'warn',
    }),
    new (winston.transports.File)({
      ...kh,
      filename: `${kh.filename}.info`,
      level: 'info',
    }),
  ]
});

const LA_SLAs_Logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      ...la,
      filename: `${la.filename}.error`,
      level: 'error',
    }),
    new (winston.transports.File)({
      ...la,
      filename: `${la.filename}.warn`,
      level: 'warn',
    }),
    new (winston.transports.File)({
      ...la,
      filename: `${la.filename}.info`,
      level: 'info',
    }),
  ]
});

export default {
  VN_SLAs_Logger,
  KH_SLAs_Logger,
  LA_SLAs_Logger
}