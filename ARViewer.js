import { useState, useRef } from 'react';
import { useMutation, gql } from '@apollo/client';

const RECOGNIZE_ARTIFACT = gql`
  mutation RecognizeArtifact($imageUrl: String!) {
    recognizeArtifact(imageUrl: $imageUrl) {
      id
      name
      description
      audioNarration
      arOverlay
    }
  }
`;

const ARViewer = () => {
  const [recognizeArtifact] = useMutation(RECOGNIZE_ARTIFACT);
  const [recognizedArtifact, setRecognizedArtifact] = useState(null);
  const fileInputRef = useRef();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // In production, upload to backend first
      const imageUrl = URL.createObjectURL(file);
      
      try {
        const result = await recognizeArtifact({
          variables: { imageUrl }
        });
        setRecognizedArtifact(result.data.recognizeArtifact);
      } catch (error) {
        console.error('Recognition failed:', error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-serif text-monastic-red mb-6">AR Artifact Recognition</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Camera/Upload Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Scan Artifact</h3>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-monastic-gold transition-colors"
               onClick={() => fileInputRef.current?.click()}>
            <div className="text-4xl mb-4">📸</div>
            <p className="text-gray-600">Click to upload image or use camera</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              capture="environment"
              className="hidden"
            />
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-3">How it works:</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Point your camera at monastery artifacts</li>
              <li>• Get instant recognition and information</li>
              <li>• View AR overlays and restored visuals</li>
              <li>• Listen to audio narrations</li>
            </ul>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Artifact Information</h3>
          
          {recognizedArtifact ? (
            <div className="space-y-4">
              <img
                src={recognizedArtifact.imageUrl}
                alt={recognizedArtifact.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h4 className="font-serif text-xl text-monastic-brown">
                {recognizedArtifact.name}
              </h4>
              <p className="text-gray-700">{recognizedArtifact.description}</p>
              
              <div className="flex space-x-3 pt-4">
                <button className="flex-1 bg-monastic-gold text-white py-2 rounded hover:bg-monastic-brown transition-colors">
                  Audio Guide
                </button>
                <button className="flex-1 border border-monastic-gold text-monastic-gold py-2 rounded hover:bg-monastic-gold hover:text-white transition-colors">
                  View AR
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">🔍</div>
              <p>Scan an artifact to see its story and meaning</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ARViewer;