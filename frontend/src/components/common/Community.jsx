import React from 'react';

const Community = ({ setActiveTab }) => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="aura-card">
        <h2 className="text-2xl font-bold text-teal-600 text-teal-400 mb-4">Community</h2>
        <p className="text-soft-white mb-6">
          Connect with others, share experiences, and find support on your journey. Join discussions, ask questions, and learn from a compassionate community.
        </p>
        <div className="flex gap-3">
          <button className="aura-button aura-button" onClick={() => setActiveTab('resources')}>Explore Resources</button>
          <button className="aura-button" onClick={() => setActiveTab('home')}>Back to Home</button>
        </div>
      </div>
    </div>
  );
};

export default Community;