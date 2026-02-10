"use client";

import { useState } from "react";

interface Venue {
  id: number;
  name: string;
  region: string;
  type: string;
  rating: number;
  verified: boolean;
}

const venueData: Venue[] = [
  { id: 1, name: "Eiffel Tower", region: "7th Arrondissement", type: "Landmark", rating: 4.7, verified: true },
  { id: 2, name: "Louvre Museum", region: "1st Arrondissement", type: "Museum", rating: 4.8, verified: true },
  { id: 3, name: "Cafe de Flore", region: "Saint-Germain", type: "Cafe", rating: 4.3, verified: true },
  { id: 4, name: "Shakespeare and Company", region: "Latin Quarter", type: "Bookstore", rating: 4.6, verified: true },
  { id: 5, name: "Le Comptoir du Pantheon", region: "Latin Quarter", type: "Restaurant", rating: 4.2, verified: false },
  { id: 6, name: "Musee d'Orsay", region: "7th Arrondissement", type: "Museum", rating: 4.7, verified: true },
  { id: 7, name: "Sacre-Coeur Basilica", region: "Montmartre", type: "Landmark", rating: 4.5, verified: true },
  { id: 8, name: "Le Marais Falafel", region: "Le Marais", type: "Restaurant", rating: 4.4, verified: false },
  { id: 9, name: "Palais Garnier", region: "Opera", type: "Theater", rating: 4.6, verified: true },
  { id: 10, name: "Jardin du Luxembourg", region: "Latin Quarter", type: "Park", rating: 4.5, verified: true },
  { id: 11, name: "Centre Pompidou", region: "Le Marais", type: "Museum", rating: 4.4, verified: true },
  { id: 12, name: "Moulin Rouge", region: "Montmartre", type: "Entertainment", rating: 4.3, verified: true },
];

export default function VenuesPage() {
  const [search, setSearch] = useState("");

  const filteredVenues = venueData.filter((venue) =>
    venue.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleEdit(venue: Venue) {
    console.log("Edit venue:", venue);
  }

  function handleDelete(venue: Venue) {
    console.log("Delete venue:", venue);
  }

  function handleAddVenue() {
    console.log("Add venue");
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-suntimes-charcoal">Venues</h1>
          <p className="text-gray-500 mt-1">Manage all venue listings</p>
        </div>
        <button
          onClick={handleAddVenue}
          className="bg-suntimes-teal text-white px-4 py-2.5 rounded-lg font-medium hover:bg-opacity-90 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Venue
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <svg
          className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search venues by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-suntimes-teal focus:border-transparent text-suntimes-charcoal"
        />
      </div>

      {/* Venues table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Region
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Verified
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredVenues.map((venue) => (
              <tr key={venue.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-suntimes-charcoal">
                  {venue.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {venue.region}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-suntimes-light-teal text-suntimes-teal">
                    {venue.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-suntimes-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {venue.rating}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {venue.verified ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Unverified
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(venue)}
                    className="text-suntimes-teal hover:text-suntimes-teal/80 text-sm font-medium transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(venue)}
                    className="text-suntimes-coral hover:text-suntimes-coral/80 text-sm font-medium transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredVenues.length === 0 && (
          <div className="px-6 py-12 text-center text-gray-500">
            No venues found matching your search.
          </div>
        )}
      </div>

      <p className="text-sm text-gray-400">
        Showing {filteredVenues.length} of {venueData.length} venues (sample data)
      </p>
    </div>
  );
}
