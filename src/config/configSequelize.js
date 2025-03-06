const envVars = require('./config').default;

module.exports = {
  "development": envVars['development'],
  "test": envVars['test'],
  "production": envVars['production']
}
