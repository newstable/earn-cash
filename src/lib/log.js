import fs from 'fs';

// const logPath = '/root/log/justearn.log';
const logPath = 'justearn.log';

const logger = {
  log: function(message, level) {
    const now = new Date();
    const formattedMessage = `[${now.toLocaleString()}] ${level}: ${message}`;

    fs.appendFile(logPath, formattedMessage + '\n', (err) => {
      if (err) {
        console.error('Error writing log:', err);
      }
    });
  }
};
export default logger