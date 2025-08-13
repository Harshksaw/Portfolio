export interface VisitData {
  ts: string;
  path: string;
  city: string | null;
  country: string | null;
  postal_code: string | null;
  // GPS-specific data
  precise_city: string | null;
  precise_country: string | null;
  precise_district: string | null;
  precise_address: string | null;
  precise_postal_code: string | null;
  user_latitude: number | null;
  user_longitude: number | null;
  // IP-specific data
  ip_city: string | null;
  ip_country: string | null;
  ip_region: string | null;
  ip_postal_code: string | null;
  ip_latitude: number | null;
  ip_longitude: number | null;
  org: string | null;
  district: string | null;
  address: string | null;
  location_source: 'gps' | 'ip' | 'denied';
  user_accuracy: number | null;
  browser: string;
  os: string;
  device_type: string;
  preferred_locale: string;
  session_id: string | null;
  is_bot: boolean;
  timezone: string | null;
}

export interface CityData {
  city: string;
  location_source: string;
  visits: number;
}

export interface PageData {
  path: string;
  visit_count: number;
  visits: number;
}

export interface AreaData {
  district: string | null;
  address: string | null;
  postal_code: string | null;
  city: string | null;
  location_source: string;
  avg_accuracy: number | null;
  count: number;
  visits: number;
}