/*
Databricks Tableau Connector
Copyright 2019 Databricks, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

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

	// Load ODBC connection string extras
	var odbcConnectStringExtrasMap = {};
	const attributeODBCConnectStringExtras = "odbc-connect-string-extras";

	if (attributeODBCConnectStringExtras in attr) {
		odbcConnectStringExtrasMap = connectionHelper
			.ParseODBCConnectString(attr[attributeODBCConnectStringExtras]);
	}

	for (var key in odbcConnectStringExtrasMap) {
		params[key] = odbcConnectStringExtrasMap[key];
	}

	var formattedParams = [];
	formattedParams.push(
		connectionHelper.formatKeyValuePair(
			driverLocator.keywordDriver, driverLocator.locateDriver(attr)));

	for (var key in params) {
		formattedParams.push(connectionHelper.formatKeyValuePair(key, params[key]));
	}
	
	return formattedParams;
})
