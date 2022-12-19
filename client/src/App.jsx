import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './App.css'
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import { GlobalContextProvider } from './utils/context';
import ProtectedRoutes from './pages/ProtectedRoutes';

// ! TODO: Come back and clean this file up last
// TODO: Handle dark/light mode switching
// TODO: Add tooltips for context on how to use OpenAI
// TODO: Update color scheme
// TODO: Don't return password on the backend

const httpLink = createHttpLink({
  // uri: 'http://localhost:3001/graphql', // This is for Developement
  uri: '/graphql', // This is for Production when pushing to Heroku
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // TODO: Add if to move forward
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
    <section className='App'>
    <GlobalContextProvider> 
      <ApolloProvider client={client}>
        <Router>
        <NavBar />
          <section className='flex-column justify-center align-center min-100-vh bg-primary main'>
            <Routes>
              <Route 
                path='/' 
                element={<Login />}
              />
              <Route 
                  path='/signup' 
                  element={<Signup />}
                />
              <Route element={<ProtectedRoutes />}>
                <Route 
                  path='/home' 
                  element={<Home />}
                />
                <Route 
                  path='/about' 
                  element={<About />}
                />
                <Route 
                  path='/contact' 
                  element={<Contact />}
                />
                <Route 
                  path='*'
                  element={<NotFound />}
                />
              </Route>
            </Routes>
          </section>
        </Router>
      </ApolloProvider>
    </GlobalContextProvider> 
    </section>
  )
}

export default App
