import api from "./api";
import { Configurations, Logger } from "./helpers/module";
var path = require('path');

try {
  //Initialize the configurations
  Configurations.instance.init(path.join(__dirname, '.env'));
  let port: string = Configurations.instance.apiPort;
  let env: string = Configurations.instance.env;
  let version: string = Configurations.instance.appVersion;

  const server = api.listen(port, () => {
    Logger.info(`API is running on http://localhost:${port}, version=${version}, env=${env}`);
  });

} catch (error) {
  Logger.error(`API Initialization Failed: ${error}`)
}