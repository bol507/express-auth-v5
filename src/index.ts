

import logger from './config/logger';
import config from './config/config';
import app from './app';

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});