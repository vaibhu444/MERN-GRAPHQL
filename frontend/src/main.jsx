import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter} from 'react-router-dom'
import GridBackground from './components/ui/GridBackground.jsx'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: import.meta.env.VITE_NODE_ENV==="development"?'http://localhost:4000/graphql': "/graphql",
  cache: new InMemoryCache(), // Apollo Client uses to cache query results after fetching them.
  credentials: 'include' // This tells Apollo Client to send cookies along with every request to the server.
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GridBackground>
        <ApolloProvider client={client} >
          <App />
        </ApolloProvider>
        
      </GridBackground>
      
    </BrowserRouter>
  </StrictMode>,
)
