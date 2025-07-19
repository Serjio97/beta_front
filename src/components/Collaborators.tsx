
import { useState, useEffect } from 'react';

interface Collaborator {
  id: string;
  name: string;
  logo: string;
  website: string;
}
interface CollaboratorsProps {
  collaborators: Collaborator[];
}

const Collaborators: React.FC<CollaboratorsProps> = ({ collaborators }) => {
  return (
    <div className="bg-gray-50 py-6">
      <div className="container-width section-padding">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-6">Our Partners</h3>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {collaborators.map((collab) => (
              <a
                key={collab.id}
                href={collab.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-32"
              >
                <div className="bg-white rounded-lg shadow p-3 h-24 flex items-center justify-center hover:shadow-md transition-shadow">
                  <img
                    src={collab.logo}
                    alt={collab.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Collaborators;