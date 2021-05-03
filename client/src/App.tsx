import React from 'react';
import ListPeople from './Components/ListPeople/ListPeople';
import  {ApolloCache,
  ApolloClient, 
  ApolloProvider,
  HttpLink, 
  from,
  InMemoryCache
} from '@apollo/client'
import {onError} from '@apollo/client/link/error'


const link = from([
  new HttpLink({uri:"/graphql"})
]);

const client = new ApolloClient({
  cache : new InMemoryCache(),
  link : link 
});

function App() {
  
  return (
    <ApolloProvider client={client}>
    <ListPeople />
    </ApolloProvider>
  );
}

export default App;
