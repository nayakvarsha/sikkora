import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';

const VirtualTour = ({ monasteries }) => {
  const [selectedTour, setSelectedTour] = useState(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Monastery List */}
      <div className="lg:col-span-1 space-y-4">
        <h2 className="text-2xl font-serif text-monastic-red mb-6">Virtual Tours</h2>
        {monasteries.map(monastery => (
          <div
            key={monastery.id}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedTour(monastery)}
          >
            <img
              src={monastery.images[0]}
              alt={monastery.name}
              className="w-full h-32 object-cover rounded-md mb-3"
            />
            <h3 className="font-serif text-lg font-semibold text-monastic-brown">
              {monastery.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{monastery.description}</p>
            <div className="flex items-center mt-3 text-sm text-monastic-gold">
              <span>{monastery.virtualTours.length} tours available</span>
            </div>
          </div>
        ))}
      </div>

      {/* 360° Viewer */}
      <div className="lg:col-span-2 bg-gray-900 rounded-xl overflow-hidden">
        {selectedTour ? (
          <div className="h-[600px] relative">
            <Canvas>
              <Sky sunPosition={[100, 10, 100]} />
              <OrbitControls enableZoom={true} />
              <mesh>
                <sphereGeometry args={[500, 60, 40]} />
                <meshBasicMaterial side={1} />
              </mesh>
            </Canvas>
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-3 rounded">
              <h3 className="font-serif text-lg">{selectedTour.name}</h3>
              <p className="text-sm">Drag to look around • Scroll to zoom</p>
            </div>
          </div>
        ) : (
          <div className="h-[600px] flex items-center justify-center text-white">
            <div className="text-center">
              <div className="text-6xl mb-4">🏛️</div>
              <p className="text-xl">Select a monastery to start virtual tour</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualTour;