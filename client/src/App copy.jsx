import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ChakraProvider } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import './App.css'
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// const client = new ApolloClient({
//   uri: '/graphql',
//   cache: new InMemoryCache(),
// });

const httpLink = createHttpLink({
  uri: '/graphql',
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

function App() {

  return (
    <ChakraProvider>
    <div className="App">
      <ApolloProvider client={client}>
      <Tabs color={'white'}>
        <TabList bg={'#2e3440ff'}>
          <Tab _selected={{ color: 'white', bg: '#2e344080' }}>Code</Tab>
          <Tab _selected={{ color: 'white', bg: '#2e344080' }}>About</Tab>
          <Tab _selected={{ color: 'white', bg: '#2e344080' }}>Contact</Tab>
          <Tab _selected={{ color: 'white', bg: '#2e344080' }}>Logout</Tab>
        </TabList>
        <TabPanels bg={'#4c566aff'} color={'black'}>
          <TabPanel>
            <Home />
          </TabPanel>
          <TabPanel>
            <About />
          </TabPanel>
          <TabPanel>
            <Contact />
          </TabPanel>
          <TabPanel>
            <Login />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ApolloProvider>
    </div>
    </ChakraProvider>
  )
}

export default App
