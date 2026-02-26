import React, { useContext } from 'react';
import { MainContext } from '../State/MainContext';
import RepoSection from './RepoSection';
import FollowersSection from './FollowersSection';
import { Container, Row, Col, Image } from 'react-bootstrap';

const InfoSection = () => {
  const { usersData } = useContext(MainContext);

  // FIX: guard against null/empty usersData to prevent crash on first render
  if (!usersData) return null;

  return (
    <Container className="mt-5">
      <Row>
        {/* Avatar + Bio */}
        <Col md={4} className="text-center text-md-start">
          <Image
            className="user_img mb-3"
            src={usersData.avatar_url}
            roundedCircle
            alt={usersData.login}
          />
          <h1 className="fs-3 fw-bold">{usersData.name || usersData.login}</h1>
          <p className="text-white-50">{usersData.bio}</p>
          {usersData.html_url && (
            <a
              className="btn btn-sm btn-primary html_link"
              href={usersData.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Go to GitHub Page
            </a>
          )}
        </Col>

        {/* Stats */}
        <Col md={8} className="userData_2nd">
          <h1>📦 Public Repos : {usersData.public_repos ?? "—"}</h1>
          <h1>👥 Followers : {usersData.followers ?? "—"}</h1>
          {usersData.company && <h1>🏢 {usersData.company}</h1>}
          {usersData.blog && (
            <h1>
              🔗{" "}
              <a
                href={usersData.blog.startsWith("http") ? usersData.blog : `https://${usersData.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="html_link"
              >
                {usersData.blog}
              </a>
            </h1>
          )}
          {usersData.location && <h1>📍 {usersData.location}</h1>}
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h3 className="mb-3">📁 Repositories</h3>
          <RepoSection />
        </Col>
        <Col>
          <h3 className="mb-3">👤 Followers</h3>
          <FollowersSection />
        </Col>
      </Row>
    </Container>
  );
};

export default InfoSection;
