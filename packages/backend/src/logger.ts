/* eslint-disable no-console */

const DEBUG = '\x1b[37m[\x1b[0m\x1b[35mDEBUG\x1b[0m\x1b[37m]\x1b[0m';
const INFO = '\x1b[37m[\x1b[0m\x1b[32mINFO\x1b[0m\x1b[37m]\x1b[0m';
const WARN = '\x1b[37m[\x1b[0m\x1b[33mWARN\x1b[0m\x1b[37m]\x1b[0m';
const ERROR = '\x1b[37m[\x1b[0m\x1b[31mERROR\x1b[0m\x1b[37m]\x1b[0m';

const format = (msg: string | object) => (typeof msg === 'string' ? msg : JSON.stringify(msg));

export const logger = {
  debug: (...msgs: Array<string | object>) => console.debug(`${DEBUG} ${msgs.map((msg) => format(msg)).join('\n')}`),
  info: (...msgs: Array<string | object>) => console.log(`${INFO} ${msgs.map((msg) => format(msg)).join('\n')}`),
  warn: (...msgs: Array<string | object>) => console.warn(`${WARN} ${msgs.map((msg) => format(msg)).join('\n')}`),
  error: (...msgs: Array<string | object>) => console.error(`${ERROR} ${msgs.map((msg) => format(msg)).join('\n')}`),
};
