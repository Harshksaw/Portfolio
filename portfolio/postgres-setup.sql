-- Vercel Postgres Setup for Visit Tracking
-- Run this in Vercel Dashboard -> Storage -> Postgres -> Data -> New Query

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Main visits table (with 15-day retention)
CREATE TABLE IF NOT EXISTS visit_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ts TIMESTAMPTZ NOT NULL,
  path TEXT NOT NULL,
  referer TEXT NULL,
  -- IP-based location (fallback)
  ip_city TEXT NULL,
  ip_region TEXT NULL,
  ip_country TEXT NULL,
  ip_postal_code TEXT NULL,
  ip_latitude DOUBLE PRECISION NULL,
  ip_longitude DOUBLE PRECISION NULL,
  -- User GPS location (primary)
  user_latitude DOUBLE PRECISION NULL,
  user_longitude DOUBLE PRECISION NULL,
  user_accuracy DOUBLE PRECISION NULL,
  location_source TEXT NOT NULL DEFAULT 'ip', -- 'gps', 'ip', 'denied'
  -- Reverse geocoded from GPS
  precise_address TEXT NULL,
  precise_city TEXT NULL,
  precise_district TEXT NULL,
  precise_postal_code TEXT NULL,
  precise_country TEXT NULL,
  -- Other data
  org TEXT NULL,
  timezone TEXT NULL,
  session_id TEXT NULL,
  device_type TEXT NOT NULL,
  browser TEXT NOT NULL,
  os TEXT NOT NULL,
  is_bot BOOLEAN NOT NULL DEFAULT false,
  preferred_locale TEXT NOT NULL,
  -- Auto-cleanup after 3 months
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '3 months')
);

-- IP cache table (enhanced with more location fields)
CREATE TABLE IF NOT EXISTS ip_cache (
  ip_hash TEXT PRIMARY KEY,
  city TEXT NULL,
  region TEXT NULL,
  country TEXT NULL,
  postal_code TEXT NULL,
  area TEXT NULL,
  district TEXT NULL,
  latitude DOUBLE PRECISION NULL,
  longitude DOUBLE PRECISION NULL,
  org TEXT NULL,
  timezone TEXT NULL,
  expires_at TIMESTAMPTZ NOT NULL
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS ix_visit_ts ON visit_events (ts);
CREATE INDEX IF NOT EXISTS ix_visit_expires ON visit_events (expires_at);
CREATE INDEX IF NOT EXISTS ix_visit_location_source ON visit_events (location_source);
CREATE INDEX IF NOT EXISTS ix_visit_gps_coords ON visit_events (user_latitude, user_longitude) WHERE user_latitude IS NOT NULL;
CREATE INDEX IF NOT EXISTS ix_visit_precise_city ON visit_events (precise_city, ts);
CREATE INDEX IF NOT EXISTS ix_visit_path_ts ON visit_events (path, ts);
CREATE INDEX IF NOT EXISTS ix_visit_device_ts ON visit_events (device_type, ts);

-- Index for IP cache cleanup
CREATE INDEX IF NOT EXISTS ix_ip_cache_expires ON ip_cache (expires_at);

-- Auto-cleanup function for expired records
CREATE OR REPLACE FUNCTION cleanup_expired_visits()
RETURNS void AS $$
BEGIN
    DELETE FROM visit_events WHERE expires_at < NOW();
    DELETE FROM ip_cache WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Optional: Schedule cleanup (you can run this manually or set up a cron job)
-- SELECT cleanup_expired_visits();
