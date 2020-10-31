export const STORAGE_CURRENT_MIGRATION_VERSION = 'STORAGE_MIGRATION_VERSION';
export const STORAGE_CURRENT_USER_ID = 'STORAGE_CURRENT_USER_ID';
export const STORAGE_AUTH_TOKEN = 'STORAGE_AUTH_TOKEN';
export const STORAGE_USER_PROFILE = 'STORAGE_USER_PROFILE';
export const STORAGE_CARRIER_PROFILE = 'STORAGE_CARRIER_PROFILE';

export const CYCLE_TIMEZONES = [
  {
    name: 'Eastern Time (US & Canada)',
    code: 'America/New_York',
    tmz_abbr: 'ET',
  },
  {
    name: 'Central Time (US & Canada)',
    code: 'America/Chicago',
    tmz_abbr: 'CT',
  },
  {
    name: 'Mountain Time (US & Canada)',
    code: 'America/Denver',
    tmz_abbr: 'MT',
  },
  {
    name: 'Pacific Time (US & Canada)',
    code: 'America/Los_Angeles',
    tmz_abbr: 'PT',
  },
  {
    name: 'Arizona',
    code: 'America/Phoenix',
    tmz_abbr: 'MST',
  },
  {
    name: 'Alaska',
    code: 'America/Anchorage',
    tmz_abbr: 'ATZ',
  },
];

export const CYCLE_TYPES = [
  {
    name: 'USA 60 hour / 7 day (Interstate)',
    code: 'USA_60_7',
    hrs: 60,
    days: 7,
  },
  {
    name: 'USA 70 hour / 8 day (Interstate)',
    code: 'USA_70_8',
    hrs: 70,
    days: 8,
  },
  {
    name: 'Alaska 70 hour / 7 day (Intrastate)',
    code: 'ALK_70_7',
    hrs: 70,
    days: 7,
  },
  {
    name: 'Alaska 80 hour / 8 day (Intrastate)',
    code: 'ALK_80_8',
    hrs: 80,
    days: 8,
  },
  {
    name: 'California 80 hour / 8 day (Intrastate)',
    code: 'CAL_80_8',
    hrs: 80,
    days: 8,
  },
  {
    name: 'Florida 70 hour / 7 day (Intrastate)',
    code: 'FL_70_7',
    hrs: 70,
    days: 7,
  },
  {
    name: 'Florida 80 hour / 8 day (Intrastate)',
    code: 'FL_80_8',
    hrs: 80,
    days: 8,
  },
  {
    name: 'Oregon 70 hour / 7 day (Intrastate)',
    code: 'OR_70_7',
    hrs: 70,
    days: 7,
  },
  {
    name: 'Oregon 80 hour / 8 day (Intrastate)',
    code: 'OR_80_8',
    hrs: 80,
    days: 8,
  },
  {
    name: 'Texas 70 hour / 7 day (Intrastate)',
    code: 'TXS_70_7',
    hrs: 70,
    days: 7,
  },
  {
    name: 'Wisconsin 70 hour / 7 day (Intrastate)',
    code: 'WI_70_7',
    hrs: 70,
    days: 7,
  },
  {
    name: 'Wisconsin 80 hour / 8 day (Intrastate)',
    code: 'WI_80_8',
    hrs: 80,
    days: 8,
  },
];
