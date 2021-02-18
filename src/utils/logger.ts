// you can replace the logger with loggin utilities like bunyan

const logger = {
  debug: (info?: any) => {},
  log: (info?: any) => {},
  info: (info?: any) => {},
  warn: (info?: any) => {},
  error: (info?: any) => {},
};
  
if (process.env.NODE_ENV === 'development') {
  logger.debug = window.console.debug;
  logger.log = window.console.log;
  logger.info = window.console.info;
  logger.warn = window.console.warn;
  logger.error = window.console.error;
}
  
export default logger;