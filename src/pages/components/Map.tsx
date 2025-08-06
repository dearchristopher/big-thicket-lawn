import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

export const Map = ({ mapLocation, geocodedAddress }: { mapLocation: { lat: number; lng: number; name: string; zoom: number }; geocodedAddress: { formatted: string; coordinates: [number, number]; city?: string; state?: string; zipCode?: string } | null }) => {
    return (<div className="mb-6">
        <div className="h-64 rounded-lg overflow-hidden border border-gray-300 z-0">
            <MapContainer
                className='z-0'
                center={[mapLocation.lat, mapLocation.lng]}
                zoom={mapLocation.zoom}
                style={{ height: '100%', width: '100%' }}
                key={`${mapLocation.lat}-${mapLocation.lng}`} // Force re-render when location changes
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[mapLocation.lat, mapLocation.lng]}>
                    <Popup>
                        <div className="text-center">
                            <strong>{mapLocation.name}</strong>
                            {geocodedAddress ? (
                                <div className="text-sm text-gray-600 mt-1">
                                    Selected property location
                                </div>
                            ) : (
                                <div className="text-sm text-gray-600 mt-1">
                                    Service area center
                                </div>
                            )}
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
        <p className="text-sm text-gray-500 mt-2 text-center">
            {geocodedAddress ? 'Property location' : 'Default service area - select an address below to update'}
        </p>
    </div>)
}