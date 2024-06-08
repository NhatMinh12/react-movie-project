import React from 'react'

const SearchFilters = ({ 
  searchTerm, setSearchTerm, 
  mpaaRating, setMpaaRating, 
  criticsPick, setCriticsPick, 
  startDate, setStartDate, 
  endDate, setEndDate 
}) => (
  <div>
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder='Search'
    />

    <select value={mpaaRating} onChange={e => setMpaaRating(e.target.value)}>
      <option value="">All Ratings</option>
      <option value="G">G</option>
      <option value="PG">PG</option>
      <option value="PG-13">PG-13</option>
      <option value="R">R</option>
    </select>

    <select value={criticsPick} onChange={e => setCriticsPick(e.target.value)}>
      <option value="">All</option>
      <option value="1">Critics Pick</option>
      <option value="0">Not Critics Pick</option>
    </select>

    <input
      type="date"
      value={startDate}
      onChange={e => setStartDate(e.target.value)}
      placeholder='Start Date'
    />

    <input
      type="date"
      value={endDate}
      onChange={e => setEndDate(e.target.value)}
      placeholder='End Date'
    />
  </div>
)

export default SearchFilters
