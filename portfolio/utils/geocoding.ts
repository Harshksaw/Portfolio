// Reverse geocoding utility for precise GPS coordinates
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export interface PreciseLocation {
  address: string | null;
  city: string | null;
  district: string | null;
  postal_code: string | null;
  country: string | null;
  accuracy: 'high' | 'medium' | 'low';
}

export async function reverseGeocode(
  latitude: number, 
  longitude: number
): Promise<PreciseLocation> {
  
  if (!GOOGLE_MAPS_API_KEY) {
    console.log('⚠️ Google Maps API key not configured, skipping precise geocoding');
    return {
      address: null,
      city: null,
      district: null,
      postal_code: null,
      country: null,
      accuracy: 'low'
    };
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`,
      { 
        signal: AbortSignal.timeout(3000),
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status !== 'OK' || !data.results || data.results.length === 0) {
      console.log('⚠️ No geocoding results found');
      return {
        address: null,
        city: null,
        district: null,
        postal_code: null,
        country: null,
        accuracy: 'low'
      };
    }

    // Get the most precise result (usually the first one)
    const result = data.results[0];
    const components = result.address_components || [];
    
    // Extract location components
    let city = null;
    let district = null;
    let postal_code = null;
    let country = null;
    
    components.forEach((component: any) => {
      const types = component.types;
      
      if (types.includes('locality') || types.includes('administrative_area_level_2')) {
        city = component.long_name;
      }
      
      if (types.includes('sublocality') || types.includes('administrative_area_level_3') || types.includes('neighborhood')) {
        district = component.long_name;
      }
      
      if (types.includes('postal_code')) {
        postal_code = component.long_name;
      }
      
      if (types.includes('country')) {
        country = component.long_name;
      }
    });

    // Determine accuracy based on result type
    let accuracy: 'high' | 'medium' | 'low' = 'medium';
    if (result.geometry && result.geometry.location_type) {
      switch (result.geometry.location_type) {
        case 'ROOFTOP':
          accuracy = 'high';
          break;
        case 'RANGE_INTERPOLATED':
          accuracy = 'medium';
          break;
        default:
          accuracy = 'low';
      }
    }

    console.log('✅ Precise geocoding successful:', {
      address: result.formatted_address,
      city,
      district,
      postal_code,
      accuracy
    });

    return {
      address: result.formatted_address || null,
      city,
      district,
      postal_code,
      country,
      accuracy
    };

  } catch (error) {
    console.error('❌ Reverse geocoding failed:', error);
    return {
      address: null,
      city: null,
      district: null,
      postal_code: null,
      country: null,
      accuracy: 'low'
    };
  }
}
