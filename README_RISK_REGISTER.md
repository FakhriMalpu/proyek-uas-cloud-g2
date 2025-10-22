# Risk Register Implementation - Banking Company

## Overview
This Risk Register has been created for a banking company following ISO 27001/31000 risk management principles, covering 20 risk items across 4 asset categories with complete analysis and treatment recommendations.

## Files Delivered

### 1. Risk Register Table_UAS_filled.xlsx
- **Format**: Excel (.xlsx)
- **Size**: ~13 KB
- **Content**: Complete Risk Register with:
  - Original template structure preserved
  - 20 risk items (5 per category)
  - Risk calculation formulas
  - Conditional formatting for risk levels
  - 13 columns including extended fields

### 2. Risk Register Table_UAS_filled.csv
- **Format**: CSV (UTF-8 with BOM)
- **Size**: ~4.5 KB
- **Purpose**: Version control friendly format for diff review
- **Content**: Same data as Excel in plain text format

### 3. Risk Register Table_UAS.xlsx (Original)
- **Status**: PRESERVED (not modified)
- **Purpose**: Template for future risk registers

## Risk Register Structure

### Column Layout (13 columns)
1. **NO** - Sequential number
2. **ASET** - Asset name
3. **Kejadian (Ancaman)** - Threat/Risk event
4. **Penyebab (Kerawanan)** - Vulnerability/Cause
5. **Sistem Pengendalian** - Current controls/mitigation plan
6. **Kemungkinan (Likelihood)** - Probability score (1-5)
7. **Nilai Dampak (Impact)** - Impact score (1-5)
8. **Nilai Risiko (Risk Score)** - Calculated: Kemungkinan × Dampak
9. **Keputusan Penanganan** - Treatment decision (Reduce/Transfer/Avoid/Accept)
10. **Level Risiko** - Qualitative level (Low/Medium/High/Extreme)
11. **PIC** - Person in Charge
12. **Target Waktu** - Target timeline
13. **Catatan** - Notes (available for future use)

### Risk Level Thresholds
- **Low**: Risk Value 1-4 (Green)
- **Medium**: Risk Value 5-9 (Yellow)
- **High**: Risk Value 10-14 (Orange)
- **Extreme**: Risk Value 15-25 (Red)

## Risk Distribution

### By Asset Category
- **Data & Informasi**: 5 items
  - Customer PII data, Transaction data, Financial reports, Cryptographic keys, SIEM logs
- **Software**: 5 items
  - Core Banking Application, Mobile Banking, Internet Banking, Database Server, Middleware/ESB
- **Hardware**: 5 items
  - Physical Servers, Firewalls, Network equipment, ATM terminals, Storage/Backup systems
- **Non Teknis**: 5 items
  - Security policies, SOPs, Critical personnel, Vendor contracts, Physical documents

### By Risk Level
- **Extreme (15-25)**: 8 items (40%)
  - Critical systems requiring immediate attention
- **High (10-14)**: 8 items (40%)
  - Significant risks requiring mitigation
- **Medium (5-9)**: 4 items (20%)
  - Moderate risks with planned controls
- **Low (1-4)**: 0 items (0%)
  - All identified risks require some level of treatment

### By Treatment Decision
- **Reduce (Mitigasi)**: 19 items (95%)
  - Implement controls to reduce likelihood or impact
- **Transfer**: 1 item (5%)
  - Vendor management - transfer risk through contracts

## Key Features

### 1. Formula Implementation
- **Risk Value**: Automated calculation using Excel formula `=F*G` (Likelihood × Impact)
- **Risk Level**: Dynamic calculation using nested IF statements
  ```excel
  =IF(H<=4,"Low",IF(H<=9,"Medium",IF(H<=14,"High","Extreme")))
  ```

### 2. Conditional Formatting
- Color-coded risk levels for visual assessment:
  - 🔴 Red: Extreme risk (8 items)
  - 🟠 Orange: High risk (8 items)
  - 🟡 Yellow: Medium risk (4 items)
  - 🟢 Green: Low risk (0 items)

### 3. Indonesian Terminology
All field names and values use consistent Indonesian terminology:
- Ancaman (Threat)
- Kerawanan/Kerentanan (Vulnerability)
- Kemungkinan (Likelihood)
- Dampak (Impact)
- Nilai Risiko (Risk Value)
- Level Risiko (Risk Level)
- Keputusan Penanganan (Treatment Decision)

### 4. Comprehensive Risk Details
Each risk item includes:
- Specific threat description
- Identified vulnerabilities
- Detailed mitigation/control plans
- Assigned responsible party (PIC)
- Target completion timeline (60-120 days)

## Usage Guidelines

### Opening the Files
1. Open `Risk Register Table_UAS_filled.xlsx` in Microsoft Excel or LibreOffice Calc
2. Both sheets are preserved: "Risk Register" and "Analis Risiko"
3. Formulas will auto-calculate when values are changed

### Updating Risk Values
1. Modify Kemungkinan (column F) or Dampak (column G) values
2. Nilai Risiko and Level Risiko will update automatically
3. Conditional formatting will adjust colors accordingly

### Version Control
- Use CSV file for git diff to track changes
- Excel file contains full formatting and formulas
- Both files should be kept in sync

### Regular Review
1. Review risk levels quarterly
2. Update mitigation progress in Sistem Pengendalian column
3. Adjust Kemungkinan/Dampak based on control effectiveness
4. Update Target Waktu as needed

## Compliance Notes

This Risk Register aligns with:
- ISO 27001:2013/2022 (Information Security Management)
- ISO 31000:2018 (Risk Management Guidelines)
- Bank Indonesia regulations on IT risk management
- OJK (Otoritas Jasa Keuangan) requirements

## Contact for PIC Roles

The following roles are assigned as PICs:
- **CISO**: Chief Information Security Officer
- **AppSec Lead**: Application Security Lead
- **Network Security Lead**: Network Security Lead
- **DBA Lead**: Database Administrator Lead
- **Compliance Lead**: Compliance Lead
- **SOC Manager**: Security Operations Center Manager
- **Head of Operations**: Operations Department Head
- Other specialized leads for specific domains

---

**Document Version**: 1.0  
**Date**: October 2025  
**Classification**: Confidential  
**Status**: Completed and Delivered
