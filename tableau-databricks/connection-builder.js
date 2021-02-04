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

  var vendorDefined = {	
		attributeHttpPath: "v-http-path"	
	}

	// The Databricks cluster ODBC endpoint
	params["HOST"] = attr[connectionHelper.attributeServer];
	params["PORT"] = "443";
	params["HTTPPATH"] = attr[vendorDefined.attributeHttpPath];
	params["THRIFTTRANSPORT"] = "2";
	params["SPARKSERVERTYPE"] = "3";
	params["SSL"] = "1";

	var authenticationMode = attr[connectionHelper.attributeAuthentication];
	switch (authenticationMode) {
		case "auth-user-pass":
		case "Username and Password":
			params["AUTHMECH"] = 3;
			params["UID"] = attr[connectionHelper.attributeUsername];
			params["PWD"] = attr[connectionHelper.attributePassword];
			break;

		case "auth-pass":
			params["AUTHMECH"] = 3;
			params["UID"] = "token";
			params["PWD"] = attr[connectionHelper.attributePassword];
			break;

		case "oauth":
			params["AUTHMECH"] = 11;
			params["AUTH_FLOW"] = 0; // token passthrough
			params["AUTH_ACCESSTOKEN"] = attr["ACCESSTOKEN"];
			break;

		default:
			return connectionHelper.ThrowTableauException("Unsupported authentication mode: " + authenticationMode);
	}

	// Use the native HiveQL query emitted by Tableau
	params["USENATIVEQUERY"] = "1";

	// Automatically reconnect to the cluster if an error occurs
	params["AutoReconnect"] = "1";

	// Minimum interval between consecutive polls for query execution status (1ms)
	params["AsyncExecPollInterval"] = "1";

	// Tell the ODBC driver that it is Tableau connecting.
	params["UserAgentEntry"] = "Tableau";

	// Load ODBC connection string extras
	var odbcConnectStringExtrasMap = {};
	const attributeODBCConnectStringExtras = connectionHelper.attributeODBCConnectStringExtras;

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
