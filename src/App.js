import './App.css';
import React, { useContext, useEffect } from 'react';
import { MainContext } from './State/MainContext';
import InfoSection from './components/InfoSection';
import SearchSection from './components/SearchSection';
import 'bootstrap/dist/css/bootstrap.min.css';

// FIX: react-bootstrap v2 — Navbar.Brand still works but
// Navbar now needs "expand" prop; variant/bg still supported
import { Navbar, Spinner, Alert, Container } from 'react-bootstrap';

const App = () => {
  const { loading, getUserData, getReposData, getFollowersData, searchTerm, apiStatus, errorMsg } = useContext(MainContext);

  // Load default user on first render
  useEffect(() => {
    getUserData("https://api.github.com/users/" + searchTerm);
    getReposData("https://api.github.com/users/" + searchTerm + "/repos");
    getFollowersData("https://api.github.com/users/" + searchTerm + "/followers");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="spinner-wrap">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-white">Loading...</p>
      </div>
    );
  }

  if (!apiStatus) {
    return (
      <>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="#">🐙 GitHub User Finder</Navbar.Brand>
          </Container>
        </Navbar>
        <Container className="mt-4">
          <SearchSection />
          <Alert variant="danger" className="mt-4">
            ❌ {errorMsg || "User not found. Try a different username."}
          </Alert>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">🐙 GitHub User Finder</Navbar.Brand>
        </Container>
      </Navbar>
      <SearchSection />
      <InfoSection />
    </>
  );
};

export default App;
