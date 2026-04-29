'use client';

/**
 * UserMap Component
 *
 * Interactive map showing user locations using Leaflet.
 */

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

interface UserLocation {
  id: string;
  username: string;
  displayName: string | null;
  latitude: number;
  longitude: number;
  city: string | null;
  region: string | null;
  country: string | null;
  capturedAt: string | null;
  isPremium: boolean;
  createdAt: string;
}

interface UserMapProps {
  locations: UserLocation[];
}

export default function UserMap({ locations }: UserMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.MarkerClusterGroup | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize map if not already
    if (!mapRef.current) {
      // Fix Leaflet default icon issue
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      // Create map centered on Indonesia (Kamaehu's primary market)
      mapRef.current = L.map(containerRef.current, {
        center: [-2.5, 118], // Center of Indonesia
        zoom: 4,
        zoomControl: true,
        scrollWheelZoom: true,
      });

      // Add light tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(mapRef.current);

      // Create marker cluster group
      markersRef.current = L.markerClusterGroup({
        chunkedLoading: true,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        maxClusterRadius: 50,
        iconCreateFunction: (cluster) => {
          const count = cluster.getChildCount();
          let size = 'small';
          let sizeClass = 'w-8 h-8 text-sm';

          if (count > 100) {
            size = 'large';
            sizeClass = 'w-12 h-12 text-lg';
          } else if (count > 10) {
            size = 'medium';
            sizeClass = 'w-10 h-10 text-base';
          }

          return L.divIcon({
            html: `<div class="${sizeClass} bg-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-2 border-white">${count}</div>`,
            className: 'custom-cluster-icon',
            iconSize: L.point(40, 40),
          });
        },
      });

      mapRef.current.addLayer(markersRef.current);
    }

    // Clear existing markers
    if (markersRef.current) {
      markersRef.current.clearLayers();
    }

    // Add markers for each location
    const markers: L.Marker[] = [];
    locations.forEach((loc) => {
      if (loc.latitude && loc.longitude) {
        // Different colors for premium vs free users
        const bgColor = loc.isPremium ? 'bg-yellow-400' : 'bg-orange-500';
        const starIcon = loc.isPremium ? '<span class="text-[8px]">★</span>' : `<svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path></svg>`;

        // Custom marker icon
        const customIcon = L.divIcon({
          html: `<div class="w-6 h-6 ${bgColor} rounded-full border-2 border-white shadow-md flex items-center justify-center ${loc.isPremium ? 'text-black font-bold' : ''}">
            ${starIcon}
          </div>`,
          className: 'custom-marker-icon',
          iconSize: L.point(24, 24),
          iconAnchor: L.point(12, 12),
        });

        const marker = L.marker([loc.latitude, loc.longitude], { icon: customIcon });

        // Add popup with premium badge
        const premiumBadge = loc.isPremium ? '<span class="inline-block bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded ml-2">PREMIUM</span>' : '';

        marker.bindPopup(`
          <div class="p-2 min-w-[150px]">
            <p class="font-semibold text-slate-900">${loc.displayName || loc.username}${premiumBadge}</p>
            <p class="text-sm text-slate-600">@${loc.username}</p>
            <hr class="my-2 border-slate-200" />
            <p class="text-xs text-slate-500">
              ${[loc.city, loc.region, loc.country].filter(Boolean).join(', ') || 'Unknown location'}
            </p>
            ${loc.capturedAt ? `<p class="text-xs text-slate-400 mt-1">Joined: ${new Date(loc.capturedAt).toLocaleDateString()}</p>` : ''}
          </div>
        `, {
          closeButton: true,
          className: 'custom-popup',
        });

        markers.push(marker);
      }
    });

    // Add markers to cluster group
    if (markersRef.current && markers.length > 0) {
      markersRef.current.addLayers(markers);

      // Fit bounds to show all markers
      if (markers.length > 0) {
        const group = L.featureGroup(markers);
        mapRef.current?.fitBounds(group.getBounds(), { padding: [50, 50] });
      }
    }

    return () => {
      // Cleanup on unmount
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [locations]);

  return (
    <>
      <style jsx global>{`
        .custom-cluster-icon {
          background: transparent !important;
          border: none !important;
        }
        .custom-marker-icon {
          background: transparent !important;
          border: none !important;
        }
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }
        .custom-popup .leaflet-popup-tip {
          background: white;
        }
        .leaflet-container {
          background: #f3f4f6 !important;
        }
      `}</style>
      <div className="relative">
        <div
          ref={containerRef}
          className="w-full h-[600px] rounded-lg overflow-hidden border border-gray-200"
        />
        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 z-[1000] shadow-md border border-gray-200">
          <p className="text-xs font-semibold text-gray-900 mb-2">Legend</p>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-400 rounded-full border border-gray-300 flex items-center justify-center">
                <span className="text-[6px] text-black font-bold">★</span>
              </div>
              <span className="text-xs text-gray-600">Premium User</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded-full border border-gray-300"></div>
              <span className="text-xs text-gray-600">Free User</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
