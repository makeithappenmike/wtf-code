import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { redirect } from "react-router-dom"; // TODO: Implement this?
import useLocalStorage from './utils/hooks/localStorage'; // ! TODO: Implement this page
import './App.css'
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// TODO: If you're not logged in, you can't access any pages besides login
// TODO: Handle dark/light mode switching
// TODO: Handle mobile experience
// TODO: Add tooltips for context on how to use OpenAI
// TODO: Update color scheme
// TODO: Handle being logged in based on state

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// TODO: Convert to state
const isLoggedIn = window.localStorage.getItem('id_token');
if (isLoggedIn) {
  console.log('logged in');
} else {
  console.log('logged out');
}

function App() {

  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
        <NavBar />
          <div className="flex-column justify-center align-center min-100-vh bg-primary main">
            <Routes>
              <Route 
                path="/" 
                element={<Home />}
              />
              <Route 
                path="/login" 
                element={<Login />}
              />
              <Route 
                path="/about" 
                element={<About />}
              />
              <Route 
                path="/contact" 
                element={<Contact />}
              />
              <Route 
                path="*"
                element={<NotFound />}
              />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </div>
  )
}

export default App
