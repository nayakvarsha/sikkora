import { useState } from 'react';
import Head from 'next/head';
import { useQuery, gql } from '@apollo/client';
import MapComponent from '../components/MapComponent';
import VirtualTour from '../components/VirtualTour';
import ARViewer from '../components/ARViewer';
import CulturalCalendar from '../components/CulturalCalendar';

const GET_MONASTERIES = gql`
  query GetMonasteries {
    monasteries {
      id
      name
      location {
        coordinates
        address
      }
      description
      images
      virtualTours {
        id
        title
      }
      artifacts {
        id
        name
        type
      }
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_MONASTERIES);
  const [activeTab, setActiveTab] = useState('map');

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-monastic-cream">
      <Head>
        <title>Monastery360 - Sikkim's Digital Heritage</title>
        <meta name="description" content="Explore Sikkim's monasteries through virtual tours and AR experiences" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-monastic-gold rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <h1 className="text-2xl font-serif text-monastic-red">Monastery360</h1>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              {['map', 'tours', 'ar', 'calendar', 'archives'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`capitalize ${
                    activeTab === tab ? 'text-monastic-gold font-semibold' : 'text-gray-600'
                  } hover:text-monastic-gold transition-colors`}
                >
                  {tab}
                </button>
              ))}
            </nav>

            <button className="bg-monastic-red text-white px-6 py-2 rounded-full hover:bg-monastic-brown transition-colors">
              Download App
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'map' && <MapComponent monasteries={data.monasteries} />}
        {activeTab === 'tours' && <VirtualTour monasteries={data.monasteries} />}
        {activeTab === 'ar' && <ARViewer />}
        {activeTab === 'calendar' && <CulturalCalendar />}
        {activeTab === 'archives' && <DigitalArchives />}
      </main>
    </div>
  );
}