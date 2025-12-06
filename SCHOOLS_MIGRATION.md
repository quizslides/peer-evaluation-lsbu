# Schools Migration Guide

## Overview

This document describes the migration from old school names to new school names in the peer evaluation system.

## New School Structure

The following schools are now active in the system:

| School Name | Code |
|------------|------|
| School of Allied Health and Life Sciences | AHLS |
| School of Nursing and Midwifery | N&M |
| School of Law and Education | L&A |
| School of Arts and Social Sciences | A&S |
| LSBU Business School | BUS |
| School of Engineering and Design | E&D |
| School of Computer Science and Digital Technologies | CSDT |
| School of Architecture and Planning | A&P |
| School of Construction, Property and Surveying | CPS |

## Migration Mapping

Old school names are automatically migrated to new names according to the following mapping:

| Old School Name | New School Name |
|----------------|-----------------|
| School of Applied Sciences | School of Allied Health and Life Sciences |
| Institute of Health and Social Care | School of Nursing and Midwifery |
| School of Law and Social Sciences | School of Law and Education |
| School of Arts and Creative Industries | School of Arts and Social Sciences |
| LSBU Business School | LSBU Business School (unchanged) |
| School of Engineering | School of Engineering and Design |
| School of The Built Environment and Architecture | School of Architecture and Planning |

**Note:** School of Engineering also maps to School of Computer Science and Digital Technologies for certain programs.

## Implementation Details

### Database Schema

The Prisma schema (`prisma/schema.prisma`) has been updated to include:
- New school enum values
- Deprecated school enum values (kept for backward compatibility)
- Comments indicating which old values map to which new values

### Code Changes

1. **Types** (`src/types/peer-evaluation/index.ts`):
   - Updated `Schools` enum with new values
   - Kept deprecated values for backward compatibility
   - Added `SchoolsMigrationMap` for automatic migration
   - Updated `SchoolsDropdown` with new school names
   - Updated `SchoolsDataTable` with new school codes

2. **Transformers** (`src/transformers/peer-evaluation/index.ts`):
   - Updated `sanitizeSchoolsOnFetch` to apply migration mapping
   - Updated `sanitizeSchoolsOnFetchPeerEvaluationView` to apply migration mapping

### Backward Compatibility

- Old school enum values remain in the database schema
- Existing peer evaluations with old school names will automatically display with new names
- The migration is transparent to users
- No data migration is required

### Testing

- Cypress tests have been verified to use the new school names
- All existing functionality remains intact

## Usage

When creating or updating peer evaluations, use the new school names from the dropdown. The system will automatically handle any existing records with old school names and display them with the new names.
