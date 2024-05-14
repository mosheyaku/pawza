/* eslint-disable no-console */

const DEBUG = '\x1b[37m[\x1b[0m\x1b[35mDEBUG\x1b[0m\x1b[37m]\x1b[0m';
const INFO = '\x1b[37m[\x1b[0m\x1b[32mINFO\x1b[0m\x1b[37m]\x1b[0m';
const WARN = '\x1b[37m[\x1b[0m\x1b[33mWARN\x1b[0m\x1b[37m]\x1b[0m';
const ERROR = '\x1b[37m[\x1b[0m\x1b[31mERROR\x1b[0m\x1b[37m]\x1b[0m';

export const logger = {
  debug: (...msgs: string[]) => console.debug(`${DEBUG} ${msgs.join('\n')}`),
  info: (...msgs: string[]) => console.log(`${INFO} ${msgs.join('\n')}`),
  warn: (...msgs: string[]) => console.warn(`${WARN} ${msgs.join('\n')}`),
  error: (...msgs: string[]) => console.error(`${ERROR} ${msgs.join('\n')}`),
};
