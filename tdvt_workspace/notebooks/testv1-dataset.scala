// Databricks notebook source
// MAGIC %sql
// MAGIC DROP DATABASE IF EXISTS Tableau_TDVT CASCADE;
// MAGIC 
// MAGIC CREATE DATABASE Tableau_TDVT;

// COMMAND ----------

// MAGIC %sql
// MAGIC USE Tableau_TDVT;

// COMMAND ----------

// MAGIC %sql
// MAGIC DROP TABLE IF EXISTS Calcs;
// MAGIC 
// MAGIC CREATE TABLE Calcs
// MAGIC (
// MAGIC     key VARCHAR(255),
// MAGIC     num0 DOUBLE,
// MAGIC     num1 DOUBLE,
// MAGIC     num2 DOUBLE,
// MAGIC     num3 DOUBLE,
// MAGIC     num4 DOUBLE,
// MAGIC     str0 VARCHAR(255),
// MAGIC     str1 VARCHAR(255),
// MAGIC     str2 VARCHAR(255),
// MAGIC     str3 VARCHAR(255),
// MAGIC     int0 INTEGER,
// MAGIC     int1 INTEGER,
// MAGIC     int2 INTEGER,
// MAGIC     int3 INTEGER,
// MAGIC     bool0 BOOLEAN,
// MAGIC     bool1 BOOLEAN,
// MAGIC     bool2 BOOLEAN,
// MAGIC     bool3 BOOLEAN,
// MAGIC     date0 DATE,
// MAGIC     date1 DATE,
// MAGIC     date2 DATE,
// MAGIC     date3 DATE,
// MAGIC     time0 TIMESTAMP,
// MAGIC     time1 TIMESTAMP, -- no "TIME" type in Spark SQL
// MAGIC     datetime0 TIMESTAMP,
// MAGIC     datetime1 VARCHAR(255),
// MAGIC     zzz VARCHAR(255)
// MAGIC ) using parquet;

// COMMAND ----------

spark.read
  .option("header", "true")
  .option("escape", "\"")
  .schema(sql("SELECT * FROM calcs LIMIT 0").schema)
  .csv("/FileStore/tables/Calcs_headers.csv")
  .write
  .mode("append")
  .format("parquet")
  .saveAsTable("Calcs")

// COMMAND ----------

sql("select * from calcs")

// COMMAND ----------

// MAGIC %sql
// MAGIC select * from calcs

// COMMAND ----------

// MAGIC %sql
// MAGIC select count(*) from calcs

// COMMAND ----------

// MAGIC %sql
// MAGIC DROP TABLE IF EXISTS Staples;
// MAGIC 
// MAGIC CREATE TABLE Staples
// MAGIC (
// MAGIC     Item_Count INTEGER NOT NULL,
// MAGIC     Ship_Priority VARCHAR(14) NOT NULL,
// MAGIC     Order_Priority VARCHAR(15) NOT NULL,
// MAGIC     Order_Status VARCHAR(13) NOT NULL,
// MAGIC     Order_Quantity DOUBLE NOT NULL,
// MAGIC     Sales_Total DOUBLE NOT NULL,
// MAGIC     Discount DOUBLE NOT NULL,
// MAGIC     Tax_Rate DOUBLE NOT NULL,
// MAGIC     Ship_Mode VARCHAR(25) NOT NULL,
// MAGIC     Fill_Time DOUBLE NOT NULL,
// MAGIC     Gross_Profit DOUBLE NOT NULL,
// MAGIC     Price DECIMAL(18,4) NOT NULL,
// MAGIC     Ship_Handle_Cost DECIMAL(18,4) NOT NULL,
// MAGIC     Employee_Name VARCHAR(50) NOT NULL,
// MAGIC     Employee_Dept VARCHAR(4) NOT NULL,
// MAGIC     Manager_Name VARCHAR(255) NOT NULL,
// MAGIC     Employee_Yrs_Exp DOUBLE NOT NULL,
// MAGIC     Employee_Salary DECIMAL(18,4) NOT NULL,
// MAGIC     Customer_Name VARCHAR(50) NOT NULL,
// MAGIC     Customer_State VARCHAR(50) NOT NULL,
// MAGIC     Call_Center_Region VARCHAR(25) NOT NULL,
// MAGIC     Customer_Balance DOUBLE NOT NULL,
// MAGIC     Customer_Segment VARCHAR(25) NOT NULL,
// MAGIC     Prod_Type1 VARCHAR(50) NOT NULL,
// MAGIC     Prod_Type2 VARCHAR(50) NOT NULL,
// MAGIC     Prod_Type3 VARCHAR(50) NOT NULL,
// MAGIC     Prod_Type4 VARCHAR(50) NOT NULL,
// MAGIC     Product_Name VARCHAR(100) NOT NULL,
// MAGIC     Product_Container VARCHAR(25) NOT NULL,
// MAGIC     Ship_Promo VARCHAR(25) NOT NULL,
// MAGIC     Supplier_Name VARCHAR(25) NOT NULL,
// MAGIC     Supplier_Balance DOUBLE NOT NULL,
// MAGIC     Supplier_Region VARCHAR(25) NOT NULL,
// MAGIC     Supplier_State VARCHAR(50) NOT NULL,
// MAGIC     Order_ID VARCHAR(10) NOT NULL,
// MAGIC     Order_Year INTEGER NOT NULL,
// MAGIC     Order_Month INTEGER NOT NULL,
// MAGIC     Order_Day INTEGER NOT NULL,
// MAGIC     Order_Date TIMESTAMP NOT NULL,
// MAGIC     Order_Quarter VARCHAR(2) NOT NULL,
// MAGIC     Product_Base_Margin DOUBLE NOT NULL,
// MAGIC     Product_ID VARCHAR(5) NOT NULL,
// MAGIC     Receive_Time DOUBLE NOT NULL,
// MAGIC     Received_Date TIMESTAMP NOT NULL,
// MAGIC     Ship_Date TIMESTAMP NOT NULL,
// MAGIC     Ship_Charge DECIMAL(18,4) NOT NULL,
// MAGIC     Total_Cycle_Time DOUBLE NOT NULL,
// MAGIC     Product_In_Stock VARCHAR(3) NOT NULL,
// MAGIC     PID INTEGER NOT NULL,
// MAGIC     Market_Segment VARCHAR(25) NOT NULL
// MAGIC ) using parquet;

// COMMAND ----------
spark.read
  .option("header", "false")
  .option("escape", "\"")
  .option("encoding", "UTF-8")
  .schema(sql("SELECT * FROM staples LIMIT 0").schema)
  .csv("/FileStore/tables/Staples_utf8.csv")
  .write
  .mode("append")
  .format("parquet")
  .saveAsTable("staples")

// COMMAND ----------

sql("select * from staples")

// COMMAND ----------

// MAGIC %sql
// MAGIC select * from Staples

// COMMAND ----------

// MAGIC %sql
// MAGIC select count(*) from Staples
