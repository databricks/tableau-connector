(function dsbuilder(attr) {
  var params = {};

	// The Databricks cluster ODBC endpoint
	params["HOST"] = attr["server"];
	params["PORT"] = "443";
	params["HTTPPATH"] = attr["dbname"];
	params["THRIFTTRANSPORT"] = "2";
	params["SPARKSERVERTYPE"] = "3";
	params["SSL"] = "1";

	// Authentication by username and password only
	params["AUTHMECH"] = 3;
	params["UID"] = attr["username"];
	params["PWD"] = attr["password"];

	// Use the native HiveQL query emitted by Tableau
	params["USENATIVEQUERY"] = "1";

	// Automatically reconnect to the cluster if an error occurs
	params["AutoReconnect"] = "1";

	// Minimum interval between consecutive polls for query execution status (1ms)
	params["AsyncExecPollInterval"] = "1";

	var formattedParams = [];
  formattedParams.push(
		connectionHelper.formatKeyValuePair(
			driverLocator.keywordDriver, driverLocator.locateDriver(attr)));

  for (var key in params) {
    formattedParams.push(connectionHelper.formatKeyValuePair(key, params[key]));
  }

  return formattedParams;
})
