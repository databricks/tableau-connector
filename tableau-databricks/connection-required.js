(function requiredAttrs(attr) {
	var params = ["enum-with-permissions",
			connectionHelper.attributeInitialSQL,
			connectionHelper.attributeAuthentication,
			"odbc-connect-string-extras"];

	params.push("username");
	params.push("password");

	params.push(connectionHelper.attributeServer);
	params = connectionHelper.SetImpersonateAttributes(attr, params);

	return params;
})
