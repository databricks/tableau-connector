# Changelog - Tableau Databricks Connector

## [1.0.0] - compare_tableau_diff branch

### Added
- Query tags support for advanced users with validation rules
- CREATE TABLE support for Delta table creation
- 5 new language localizations (French Canadian, Irish Gaelic, Dutch, Swedish, Thai)
- Single-use refresh token capability for OAuth
- Tableau Prep write support to Databricks
- Vendor information and license key in manifest

### Changed
- Fixed analytic window functions to use standard SQL functions (MIN, MAX, SUM, AVG, COUNT)
- Enhanced driver resolution with simba-oem attribute
- Updated authentication labels across all languages
- Removed legacy basic authentication option

### Technical Details
- Query tags: Keys/values cannot contain `,:` characters
- ODBC extras: Keys can contain `a-zA-Z0-9_.-` characters
- Improved OAuth security with single-use refresh tokens
