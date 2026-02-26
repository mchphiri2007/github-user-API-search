import React, { useContext } from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import { MainContext } from '../State/MainContext';

const FollowersSection = () => {
  // FIX: removed duplicate useEffect fetch — same reason as RepoSection
  const { followersData } = useContext(MainContext);

  // FIX: safe array check
  if (!Array.isArray(followersData) || followersData.length === 0) {
    return <p className="text-white-50">No followers found.</p>;
  }

  return (
    <div className="reposContainer">
      {followersData.map((follower) => (
        <div key={follower.id} className="reposCard">
          <Row className="align-items-center">
            <Col xs={3}>
              {/* FIX: added alt text for accessibility — React 18 warns without it */}
              <Image
                src={follower.avatar_url}
                fluid
                roundedCircle
                alt={follower.login}
              />
            </Col>
            <Col>
              <h2>{follower.login}</h2>
              <a
                className="btn btn-sm btn-primary html_link"
                href={follower.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Profile
              </a>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
};

export default FollowersSection;
