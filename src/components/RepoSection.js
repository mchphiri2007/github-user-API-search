import React, { useContext } from 'react';
import { MainContext } from '../State/MainContext';

const RepoSection = () => {
  // FIX: removed useEffect fetching here — data is already fetched in App.js
  // and re-fetched on every search in SearchSection. Calling it again here
  // caused duplicate API calls and stale data bugs.
  const { reposData } = useContext(MainContext);

  // FIX: check Array.isArray to safely handle null/string initial state
  if (!Array.isArray(reposData) || reposData.length === 0) {
    return <p className="text-white-50">No repositories found.</p>;
  }

  return (
    <div className="reposContainer">
      {reposData.map((repo) => (
        <div key={repo.id} className="reposCard">
          <h2>{repo.name}</h2>
          {repo.description && (
            <p className="text-white-50 small">{repo.description}</p>
          )}
          <div className="d-flex gap-2 flex-wrap mt-2">
            {repo.language && (
              <span className="badge bg-secondary">{repo.language}</span>
            )}
            <span className="badge bg-dark border border-secondary">⭐ {repo.stargazers_count}</span>
            <span className="badge bg-dark border border-secondary">🍴 {repo.forks_count}</span>
          </div>
          <a
            className="btn btn-sm btn-primary mt-2 html_link"
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Repository
          </a>
        </div>
      ))}
    </div>
  );
};

export default RepoSection;
