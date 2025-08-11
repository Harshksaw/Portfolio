-- Vercel Postgres Setup for Visit Tracking
-- Run this in Vercel Dashboard -> Storage -> Postgres -> Data -> New Query

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Main visits table
CREATE TABLE IF NOT EXISTS visit_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ts TIMESTAMPTZ NOT NULL,
  path TEXT NOT NULL,
  referer TEXT NULL,
  city TEXT NULL,
  region TEXT NULL,
  country TEXT NULL,
  latitude DOUBLE PRECISION NULL,
  longitude DOUBLE PRECISION NULL,
  session_id TEXT NULL,
  device_type TEXT NOT NULL,
  browser TEXT NOT NULL,
  os TEXT NOT NULL,
  is_bot BOOLEAN NOT NULL DEFAULT false,
  preferred_locale TEXT NOT NULL
);

-- IP cache table (optional - for ipinfo.io caching)
CREATE TABLE IF NOT EXISTS ip_cache (
  ip_hash TEXT PRIMARY KEY,
  city TEXT NULL,
  region TEXT NULL,
  country TEXT NULL,
  latitude DOUBLE PRECISION NULL,
  longitude DOUBLE PRECISION NULL,
  org TEXT NULL,
  timezone TEXT NULL,
  expires_at TIMESTAMPTZ NOT NULL
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS ix_visit_ts ON visit_events (ts);
CREATE INDEX IF NOT EXISTS ix_visit_city_ts ON visit_events (city, ts);
CREATE INDEX IF NOT EXISTS ix_visit_path_ts ON visit_events (path, ts);
CREATE INDEX IF NOT EXISTS ix_visit_device_ts ON visit_events (device_type, ts);

-- Index for IP cache cleanup
CREATE INDEX IF NOT EXISTS ix_ip_cache_expires ON ip_cache (expires_at);

-- Optional: Clean up expired cache entries (run this periodically)
-- DELETE FROM ip_cache WHERE expires_at < NOW();
