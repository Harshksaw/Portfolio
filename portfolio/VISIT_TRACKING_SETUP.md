# Visit Tracking Setup Instructions (Vercel Postgres)

## Overview
Your portfolio now automatically tracks visits to your main page, collecting geolocation data and user analytics using Vercel Postgres.

## Setup Steps

### 1. Link Vercel Postgres
1. Go to Vercel Dashboard → your project → **Storage** tab
2. Click **Add** → **Postgres** → **Link** to Production (and Preview if you use it)
3. Vercel automatically injects environment variables (`POSTGRES_URL`, etc.)

### 2. Create Database Tables
Run the SQL in `postgres-setup.sql` in your Vercel Postgres dashboard:
1. Go to Vercel Dashboard → Storage → Postgres → **Data** tab
2. Click **New Query**
3. Copy and paste the contents of `postgres-setup.sql`
4. Click **Run**

### 3. Environment Variables Setup

Add these to your `.env` file or hosting platform environment variables:

```bash
# Tracking Configuration
TRACK_SECRET=dIirf2CMuP/kV/mXFS/HWmvr6yTcEnSGIIbLy2gnAj0=
NEXT_PUBLIC_TRACK_SECRET=dIirf2CMuP/kV/mXFS/HWmvr6yTcEnSGIIbLy2gnAj0=

# IPInfo Configuration (for geolocation)
IPINFO_TOKEN=get_from_ipinfo.io

# Hash Salt for IP privacy
HASH_SALT=Addu8KIWKLlFWIyDbNSVnu/7O5v2/JY8jNTJ2PM6Glo=
```

**Note:** Postgres environment variables are automatically injected by Vercel when you link storage.

### How to Get IPInfo Token:
1. Go to [ipinfo.io](https://ipinfo.io/)
2. Sign up for a free account
3. Get your API token from the dashboard
4. Add it to your environment variables

## API Endpoints:

### Track Visits:
- **POST** `/api/track`
- Automatically called when users visit your main page

### View Visit Stats:
- **GET** `/api/admin/pg/recent` - Today's visits (last 200)
- **GET** `/api/admin/pg/cities` - Visits by city (today)
- **GET** `/api/admin/pg/pages` - Top pages (today)
- **GET** `/admin` - Visual dashboard (HTML interface)

### Legacy Redis endpoint (deprecated):
- ~~`/api/admin/visits`~~ - Use the new Postgres endpoints above

## Testing:

1. Link Vercel Postgres storage to your project
2. Run the database setup SQL
3. Deploy your application
4. Visit your main page
5. Check the `/admin` page to see tracked data
6. Or hit the API endpoints directly:
   - `/api/admin/pg/recent`
   - `/api/admin/pg/cities`
   - `/api/admin/pg/pages`

## Privacy Features:
- IP addresses are hashed with salt for privacy
- Geolocation data is cached to reduce API calls
- No personally identifiable information is stored

## Production Deployment:
Make sure to set all environment variables in your hosting platform (Vercel, Netlify, etc.) before deploying.
