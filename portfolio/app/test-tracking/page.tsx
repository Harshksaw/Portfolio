"use client";
import { useEffect, useState } from 'react';

export default function TestTrackingPage() {
  const [envStatus, setEnvStatus] = useState({
    trackSecret: false,
    ipinfoToken: false,
    hashSalt: false,
  });

  const [testResult, setTestResult] = useState<string>('');

  useEffect(() => {
    // Check environment variables (client-side only shows public ones)
    setEnvStatus({
      trackSecret: !!process.env.NEXT_PUBLIC_TRACK_SECRET,
      ipinfoToken: false, // Can't check server-side env from client
      hashSalt: false, // Can't check server-side env from client
    });
  }, []);

  const testTracking = async () => {
    setTestResult('🔍 Testing tracking...');
    
    try {
      const response = await fetch('/api/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TRACK_SECRET}`,
        },
        body: JSON.stringify({
          ts: new Date().toISOString(),
          path: '/test',
          referer: window.location.href,
          session_id: 'test-session-' + Date.now(),
          device_type: 'desktop',
          browser: 'Test Browser',
          os: 'Test OS',
          is_bot: false,
          locale: 'en-US',
        }),
      });

      if (response.ok) {
        setTestResult('✅ Tracking test successful! Check console for details.');
      } else {
        setTestResult(`❌ Tracking test failed: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setTestResult(`💥 Tracking test error: ${error}`);
    }
  };

  const checkStats = async () => {
    setTestResult('📊 Checking stats...');
    
    try {
      const response = await fetch('/api/admin/visits');
      
      if (response.ok) {
        const data = await response.json();
        setTestResult(`✅ Stats retrieved! Found ${data.length} visits today.`);
      } else {
        setTestResult(`❌ Stats check failed: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setTestResult(`💥 Stats check error: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Tracking Test Page</h1>
        
        {/* Environment Status */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment Configuration</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className={`w-3 h-3 rounded-full mr-3 ${envStatus.trackSecret ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span>NEXT_PUBLIC_TRACK_SECRET: {envStatus.trackSecret ? 'SET' : 'NOT SET'}</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full mr-3 bg-yellow-500"></span>
              <span>IPINFO_TOKEN: Check server logs</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full mr-3 bg-yellow-500"></span>
              <span>HASH_SALT: Check server logs</span>
            </div>
          </div>
        </div>

        {/* Test Buttons */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Functions</h2>
          <div className="space-x-4">
            <button 
              onClick={testTracking}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Test Tracking API
            </button>
            <button 
              onClick={checkStats}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Check Stats API
            </button>
          </div>
        </div>

        {/* Test Result */}
        {testResult && (
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Test Result:</h3>
            <pre className="whitespace-pre-wrap">{testResult}</pre>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 p-6 rounded-lg shadow mt-6">
          <h2 className="text-xl font-semibold mb-4">How to Check Logs:</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Client-side logs:</strong> Open browser DevTools → Console tab</p>
            <p><strong>Server-side logs:</strong> Check your terminal where you run <code>npm run dev</code></p>
            <p><strong>What to look for:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>🔍 Starting visit tracking...</li>
              <li>✅ Generated new session ID</li>
              <li>📊 Tracking data prepared</li>
              <li>✅ Visit tracked successfully!</li>
              <li>💾 Storing visit data</li>
              <li>✅ Visit data stored successfully in Redis</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
