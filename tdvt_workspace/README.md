Instructions for running TDVT testing on the Tableau Databricks connector:

1. Install TDVT on your Windows machine using the guide from https://tableau.github.io/connector-plugin-sdk/docs/tdvt. The resulting tdvt_workspace directory should contain the following subdirectories: config, plugins, and tds.

2. Prepare the testing tables.
Use the tables in dogfood which is under Catalog `tableau` Schema `tableau_tdvt`

3. Update the tds files
- Replace in the `Staples.databricks.tds` and `cast_cals.databricks.tds` files the connection parameters: 
   (a) _.fcp.DatabricksCatalog.true...v-http-path | _.fcp.DatabricksCatalog.false...dbname   = '<HTTP_PATH>' (see JDBC/ODBC cluster tab)
   (b) password='<your_token>' (generated)

4. Inside the config directory there is a `databricks.ini` file in which you can choose which tests to run and set the path to the connector files.

