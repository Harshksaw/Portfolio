# Visit Tracking Setup Instructions

## Overview
Your portfolio now automatically tracks visits to your main page, collecting geolocation data and user analytics.

## Environment Variables Setup

### Required Variables:
Add these to your `.env` file or hosting platform environment variables:

```bash
# Tracking Configuration
TRACK_SECRET=generate_a_secure_random_string_here
NEXT_PUBLIC_TRACK_SECRET=same_as_above

# IPInfo Configuration (for geolocation)
IPINFO_TOKEN=get_from_ipinfo.io

# Hash Salt for IP privacy
HASH_SALT=another_secure_random_string

# Redis Configuration
REDIS_URL=your_redis_connection_url_here
```

### How to Get IPInfo Token:
1. Go to [ipinfo.io](https://ipinfo.io/)
2. Sign up for a free account
3. Get your API token from the dashboard
4. Add it to your environment variables

### Generate Secure Strings:
Use this command to generate secure random strings:
```bash
openssl rand -base64 32
```

### Redis Setup:
You'll need a Redis database for storing visit data. You can use:
1. **Redis Cloud** (free tier available): https://redis.com/try-free/
2. **Upstash Redis** (serverless): https://upstash.com/
3. **Local Redis** for development: `redis://localhost:6379`

The `REDIS_URL` should be in the format:
```
redis://username:password@host:port
```

## What Data is Collected:

### Geolocation Data (from IP):
- City
- Region/State
- Country
- Latitude/Longitude
- ISP/Organization
- Timezone

### User Data:
- Timestamp of visit
- Page path visited
- Referrer URL
- Session ID (generated client-side)
- Device type (mobile/tablet/desktop)
- Browser information
- Operating system
- Bot detection
- User locale/language

## API Endpoints:

### Track Visits:
- **POST** `/api/track`
- Automatically called when users visit your main page

### View Visit Stats:
- **GET** `/api/admin/visits`
- Returns all visits for the current day
- Example: `http://localhost:3000/api/admin/visits`

## Testing:

1. Set up environment variables
2. Run your development server: `npm run dev`
3. Visit your main page
4. Check the `/api/admin/visits` endpoint to see tracked data

## Privacy Features:
- IP addresses are hashed with salt for privacy
- Geolocation data is cached to reduce API calls
- No personally identifiable information is stored

## Production Deployment:
Make sure to set all environment variables in your hosting platform (Vercel, Netlify, etc.) before deploying.
