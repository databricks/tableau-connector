Tableau Databricks Connector
==================

## Overview 
This directory contains the Tableau Databricks Connector.

The connector is built with the Tableau Connector SDK and provides:
- a simplified connection dialog
- extensions of the Spark SQL dialect that clear all Tableau Datasource Verification Tool tests
- optimized ODBC connection settings

The connector consists of a set of files that describe the UI elements needed
to collect user input for creating a connection to a Databricks cluster and
dialect specifications and customizations needed for the connection.

The connector includes a connection string builder in which we incorporate optimal
ODBC parameter settings and a driver resolver that contains the ODBC
driver version.

See also https://docs.databricks.com/user-guide/bi/tableau.html


## Dev Cycle

To test a custom connector, follow the steps below:
 
1. Remove the embedded connector file from the connector directory:
 - MacOS: `/Applications/Tableau Desktop <version>.app/Contents/Frameworks/connectors/libdatabricks.dylib`
 - Windows: `C:\Program Files\Tableau\Tableau 2020.2\bin\connectors\databricks.ddl`

2. (Optional) Change the name of the connector in the `manifest.xml` file. This is not strictly necessary, but the name field uses a string constant which remains unresolved when loaded as a plugin. Therefore, the display name will be something similar to `@string/databricks`.


3. Include the vendor information in the `manifest.xml`. The fact that the connector plugin doesn’t include vendor information is intentional, so this change shouldn’t be pushed to the repo. Tableau incorporated connectors have a slightly different integration than most custom connectors. However, when loading it using the command line argument you will need to add it to pass the `XSD` validation for the manifest file when Tableau starts up.
```
<connector-plugin class='databricks' superclass='spark' plugin-version='0.1' name='Databricks' version='18.1'> <vendor-information> <company name="Company Name"/> <support-link url = "https://example.com"/> </vendor-information> ... </connector-plugin>.
```

4. Start Tableau with the connector plugin path:
 - MacOS: `/Applications/Tableau\ Desktop\<version>.app/Contents/MacOS/Tableau -DConnectPluginsPath=$PATH/tableau-connector/connectors -DLogLevel=Debug`
 - `C:\Program Files\Tableau\Tableau <version>\bin\tableau.exe" "-DConnectPluginsPath=$PATH\tableau-connector\connectors` -DLogLevel=Debug`


## Testing the Connector

### Tableau Desktop
1. Test connecting to the correct database with a valid user but without the drivers installed, verify that the error message is good
2. Clicking Connect (and canceling)
3. Enter valid items (name, user, password, db, port, client, language etc) in each field and verify it connects
4. Verify that the default Connect name is correct and you can change it 
5. Can connect successfully using all supported methods of authentication
6. Duplicating the data connection
7. Closing the data connection
8. Properties of data connection are correct. Enter a bad password and verify that Tableau detects the error correctly.
9. Making Extracts
10. Refreshing Extracts
11. Edit your connection (right-click -> `Edit Connection`) and change all possible items (server name, auth, user, password, database, tables, custom SQL and any other available items), verify changes are applied.
12. Simple localization test

### Tableau Server
1. Publish workbook to and open from data server without extract
2. Publish workbook to and open from data server with extract
3. Publish workbooks refresh extract on server
4. Verify the views ask you to login if you did not embed credentials in the preview panel
5. Open workbooks
6. Publish datasource without extract
7. Publish datasource with extract
8. Extract or refresh the extracts of the data server data sources

