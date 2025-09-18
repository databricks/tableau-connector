# Changelog - Tableau Databricks Connector

All notable changes to the Tableau Databricks Connector will be documented in this file.

## [1.0] - compare_tableau_diff branch

### 🔧 **Core Functionality Improvements**

#### SQL Dialect Enhancements
- **Fixed Analytic Window Functions**: Override inherited `ANALYTIC_WINDOW_*` functions from Hive12Dialect to use standard SQL functions instead
  - `ANALYTIC_WINDOW_MIN` → `MIN`
  - `ANALYTIC_WINDOW_MAX` → `MAX` 
  - `ANALYTIC_WINDOW_SUM` → `SUM`
  - `ANALYTIC_WINDOW_AVG` → `AVG`
  - `ANALYTIC_WINDOW_COUNT` → `COUNT`
  - `ANALYTIC_WINDOW_COUNTD` → `COUNT(DISTINCT)`
- **Added CREATE TABLE Support**: New `format-create-table` configuration for Delta table creation with proper column mapping

#### Connection & Driver Updates
- **Enhanced Driver Resolution**: Added `simba-oem='true'` attribute to Simba Spark driver matching
- **Database Field Configuration**: Made database field optional and non-editable in connection metadata
- **OAuth Improvements**: Added `OAUTH_CAP_SINGLE_USE_REFRESH_TOKEN` capability for enhanced security
- **Catalog Parameter Updates**: Enhanced catalog handling with both `CATALOG` and `SSP_databricks.catalog` parameters
- **Prep Write Support**: Added `StagingAllowedLocalPaths` parameter for Tableau Prep write operations to Databricks

### 🏷️ **Query Tags Support**

#### New Query Tags Feature
- **Query Tags Field**: Added `v-query-tags` field in connection configuration for advanced users
- **Validation Rules**: Implemented strict validation for query tags format (`key:value,key2:value2`)
  - Keys/Values cannot contain `,:` characters
  - Each value limited to 128 characters
- **ODBC Integration**: Query tags are passed as `SSP_QUERY_TAGS` parameter to ODBC driver
- **Precedence**: Query tags take precedence over ODBC extras when both are provided
- **Placeholder Support**: Added helpful placeholder text with examples (`E.g., team:marketing,dashboard:analytics`)

### 🌍 **Internationalization (i18n) Updates**

#### New Language Support
- Added French Canadian (`fr_CA`) localization
- Added Irish Gaelic (`ga_IE`) localization  
- Added Dutch (`nl_NL`) localization
- Added Swedish (`sv_SE`) localization
- Added Thai (`th_TH`) localization

### 🔐 **Authentication & Security**

#### Authentication Method Updates
- **Removed Legacy Basic Auth**: Eliminated "Basic auth (legacy)" option across all localizations
- **Enhanced Service Principal Support**: Improved Service Principal OAuth labeling and configuration
- **Streamlined Credential Fields**: Updated username/password prompts to use "Client ID" and "Token" terminology
- **OAuth Security**: Added single-use refresh token capability for enhanced security

### 📝 **UI/UX Enhancements**

#### Connection Dialog
- **Simplified Authentication Options**: Removed redundant authentication methods
- **Consistent Terminology**: Standardized terminology across all supported languages
- **Advanced Configuration**: Query tags field placed in advanced category for power users

---

## Previous Versions

### [18.0] - master branch
- Base version with core Databricks connectivity
- Basic OAuth and token authentication support
- Multi-language support for major languages
- Standard Spark SQL dialect support

---

**Note**: This changelog covers changes from the `compare_tableau_diff` branch compared to the `master` branch. The changes focus on improving SQL compatibility, expanding internationalization support, enhancing security, adding query tags functionality, and streamlining the user experience.
