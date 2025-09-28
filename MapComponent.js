import { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapComponent = ({ monasteries }) => {
  const [selectedMonastery, setSelectedMonastery] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: 88.6126,
    latitude: 27.3389,
    zoom: 9
  });

  return (
    <div className="h-[600px] rounded-xl overflow-hidden shadow-lg">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/light-v11"
      >
        {monasteries.map(monastery => (
          <Marker
            key={monastery.id}
            longitude={monastery.location.coordinates[0]}
            latitude={monastery.location.coordinates[1]}
            anchor="bottom"
          >
            <button
              className="cursor-pointer"
              onClick={e => {
                e.preventDefault();
                setSelectedMonastery(monastery);
              }}
            >
              <div className="bg-monastic-red text-white p-2 rounded-full shadow-lg hover:bg-monastic-gold transition-colors">
                <span className="font-bold">M</span>
              </div>
            </button>
          </Marker>
        ))}

        {selectedMonastery && (
          <Popup
            longitude={selectedMonastery.location.coordinates[0]}
            latitude={selectedMonastery.location.coordinates[1]}
            anchor="top"
            onClose={() => setSelectedMonastery(null)}
            className="max-w-sm"
          >
            <div className="p-2">
              <h3 className="font-serif text-lg font-bold text-monastic-red">
                {selectedMonastery.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {selectedMonastery.description}
              </p>
              <div className="mt-3 flex space-x-2">
                <button className="bg-monastic-gold text-white px-3 py-1 rounded text-sm hover:bg-monastic-brown transition-colors">
                  Virtual Tour
                </button>
                <button className="border border-monastic-gold text-monastic-gold px-3 py-1 rounded text-sm hover:bg-monastic-gold hover:text-white transition-colors">
                  View Artifacts
                </button>
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapComponent;