tableau-databricks
==================
This directory contains the Tableau named connector for Databricks clusters.

The connector is built with the Tableau connector SDK and provides:
- a simplified connection dialog
- extensions of the Spark SQL dialect that clear all TDVT failures
- optimized ODBC connection settings

The connector consists of a set of files that describe the UI elements needed
to collect user input for creating a connection to a Databricks cluster and
dialect specifications and customizations needed for the connection.

The connector includes a connection string builder in which we incorporate optimal
ODBC parameter settings and a driver resolver that contains the ODBC
driver version.

See also https://docs.databricks.com/user-guide/bi/tableau.html

