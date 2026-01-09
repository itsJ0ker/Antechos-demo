import React from 'react';
import QuickConnectivityTest from '../components/debug/QuickConnectivityTest';
import DatabaseConnectivityTest from '../components/debug/DatabaseConnectivityTest';

const DatabaseTest = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Quick Test */}
        <QuickConnectivityTest />
        
        {/* Detailed Test */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Diagnostics</h3>
          <p className="text-gray-600 mb-4">
            If the quick test passes but you're still having issues, run the detailed test below.
          </p>
          <DatabaseConnectivityTest />
        </div>
      </div>
    </div>
  );
};

export default DatabaseTest;