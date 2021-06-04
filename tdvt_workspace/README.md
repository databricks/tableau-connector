Instructions for running TDVT testing on the Tableau Databricks connector:

1. Install TDVT on your Windows machine using the guide from https://tableau.github.io/connector-plugin-sdk/docs/tdvt. The resulting tdvt_workspace directory should contain the following subdirectories: config, plugins, and tds.

2. Prepare the testing tables.
- Set `spark.sql.crossJoin.enabled true` in the cluster Spark configuration tab
- Upload the TestV1 datasets from
   https://github.com/tableau/connector-plugin-sdk/tree/master/tests/datasets/TestV1
from the `Data -> Add Data` menu in your Databricks environment.
- Run the `testv1_datasets` notebook inside the notebooks directory to
   create the testing tables.

3. Update the tds files
- Replace in the `Staples.databricks.tds` and `cast_cals.databricks.tds` files the connection parameters: 
   (a) server='<SHARD_NAME>'
   (b) dbname='<HTTP_PATH>' (see JDBC/ODBC cluster tab)
   (b) username='token' (fixed) 
   (c) password='<your_token>' (generated)

4. Inside the config directory there is a `databricks.ini` file in which you can choose which tests to run and set the path to the connector files.

