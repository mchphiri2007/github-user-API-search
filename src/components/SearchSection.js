import React, { useContext } from 'react';
// FIX: react-bootstrap v2 — FormControl is now Form.Control (no separate import)
import { Container, Row, Col, Form } from 'react-bootstrap';
import { MainContext } from '../State/MainContext';

const SearchSection = () => {
  const { getUserData, setSearchTerm, searchTerm, getFollowersData, getReposData } = useContext(MainContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    getUserData("https://api.github.com/users/" + searchTerm);
    getFollowersData("https://api.github.com/users/" + searchTerm + "/followers");
    getReposData("https://api.github.com/users/" + searchTerm + "/repos");
  };

  return (
    <Container>
      <Row>
        <Col>
          {/* FIX: removed method="POST" — not valid on React controlled forms */}
          <Form className="d-flex" onSubmit={handleSubmit}>
            {/* FIX: Form.Control replaces the old standalone FormControl import */}
            <Form.Control
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="search"
              placeholder="Search GitHub username..."
              className="p-2 mt-3"
              aria-label="Search"
            />
            <button className="search-btn btn btn-primary mt-3 ms-3">
              Search
            </button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchSection;
