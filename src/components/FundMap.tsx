import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const FundMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [tokenInput, setTokenInput] = useState('');
  const [mapInitialized, setMapInitialized] = useState(false);

  // Country coordinates for primary focus
  const primaryFocusCountries = [
    { name: 'Saudi Arabia', coordinates: [45.0792, 23.8859] },
    { name: 'UAE', coordinates: [54.3773, 24.4539] },
    { name: 'Jordan', coordinates: [36.2384, 30.5852] },
    { name: 'Egypt', coordinates: [30.8025, 26.8206] },
    { name: 'Tunisia', coordinates: [9.5375, 33.8869] },
    { name: 'Morocco', coordinates: [-7.0926, 31.7917] },
    { name: 'Algeria', coordinates: [1.6596, 28.0339] },
    { name: 'Pakistan', coordinates: [69.3451, 30.3753] }
  ];

  // Secondary focus countries
  const secondaryFocusCountries = [
    { name: 'Nigeria', coordinates: [8.6753, 9.0820] },
    { name: 'Cameroon', coordinates: [12.3547, 7.3697] }
  ];

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [25, 25],
      zoom: 2.5,
      pitch: 0,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    map.current.on('load', () => {
      // Add primary focus markers
      primaryFocusCountries.forEach((country) => {
        const el = document.createElement('div');
        el.className = 'primary-marker';
        el.style.cssText = `
          background-color: #3b82f6;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
          cursor: pointer;
        `;

        new mapboxgl.Marker(el)
          .setLngLat(country.coordinates as [number, number])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div style="padding: 8px; font-family: sans-serif;">
                  <h4 style="margin: 0 0 4px 0; color: #1f2937;">${country.name}</h4>
                  <p style="margin: 0; color: #6b7280; font-size: 12px;">Primary Focus</p>
                </div>
              `)
          )
          .addTo(map.current!);
      });

      // Add secondary focus markers
      secondaryFocusCountries.forEach((country) => {
        const el = document.createElement('div');
        el.className = 'secondary-marker';
        el.style.cssText = `
          background-color: #10b981;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.6);
          cursor: pointer;
        `;

        new mapboxgl.Marker(el)
          .setLngLat(country.coordinates as [number, number])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div style="padding: 8px; font-family: sans-serif;">
                  <h4 style="margin: 0 0 4px 0; color: #1f2937;">${country.name}</h4>
                  <p style="margin: 0; color: #6b7280; font-size: 12px;">Secondary Focus</p>
                </div>
              `)
          )
          .addTo(map.current!);
      });

      // Add regions highlighting
      map.current!.addSource('africa-highlight', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [[
                  [-20, 40],
                  [55, 40],
                  [55, -35],
                  [-20, -35],
                  [-20, 40]
                ]]
              },
              properties: {}
            }
          ]
        }
      });

      map.current!.addLayer({
        id: 'africa-highlight',
        type: 'fill',
        source: 'africa-highlight',
        paint: {
          'fill-color': '#f59e0b',
          'fill-opacity': 0.1
        }
      });

      // Add Middle East highlighting
      map.current!.addSource('middle-east-highlight', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [[
                  [25, 45],
                  [75, 45],
                  [75, 10],
                  [25, 10],
                  [25, 45]
                ]]
              },
              properties: {}
            }
          ]
        }
      });

      map.current!.addLayer({
        id: 'middle-east-highlight',
        type: 'fill',
        source: 'middle-east-highlight',
        paint: {
          'fill-color': '#f59e0b',
          'fill-opacity': 0.1
        }
      });
    });

    setMapInitialized(true);
  };

  const handleTokenSubmit = () => {
    if (tokenInput.trim()) {
      setMapboxToken(tokenInput.trim());
    }
  };

  useEffect(() => {
    if (mapboxToken && !mapInitialized) {
      initializeMap();
    }
  }, [mapboxToken, mapInitialized]);

  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  if (!mapboxToken) {
    return (
      <div className="py-20 bg-gray-900 text-white">
        <div className="container-width section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Geographic Focus
            </h2>
            <p className="text-xl text-gray-300">
              Strategic investment regions across Africa and the Middle East
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto px-4">
        <Card className="bg-gray-800 border-gray-700 overflow-hidden rounded-xl">
          <img 
            src="/lovable-uploads/map.jpg" 
            alt="Map" 
            className="w-full h-auto object-contain"
          />
        </Card>
      </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-900 text-white">
      <div className="container-width section-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Geographic Focus
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Strategic investment regions across Africa and the Middle East
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-3">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <div ref={mapContainer} className="w-full h-96 lg:h-[500px]" />
            </div>
          </div>

          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Primary Focus</CardTitle>
                <CardDescription className="text-gray-300">
                  Core investment markets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {primaryFocusCountries.map((country, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">{country.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Secondary Focus</CardTitle>
                <CardDescription className="text-gray-300">
                  Selective opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {secondaryFocusCountries.map((country, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">{country.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Opportunistic</CardTitle>
                <CardDescription className="text-gray-300">
                  Broader regional approach
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">African Markets</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Middle East</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundMap;