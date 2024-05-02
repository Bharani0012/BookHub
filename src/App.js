import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import './App.css'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Header from './components/Header'
import BookDetails from './components/BookDetails'
import BookShelves from './components/BookShelves'
import ProtectedRoute from './components/ProtectedRoute'
import {ThemeProvider} from './ThemeContextProvider/ThemeContext'

const App = props => {
  const {location} = props
  const isLoginPage = location.pathname === '/login'
  const isNotFoundPage = location.pathname === '/not-found'
  return (
    <ThemeProvider>
      {!isLoginPage && !isNotFoundPage && <Header />}
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/shelf" component={BookShelves} />
        <ProtectedRoute exact path="/books/:id" component={BookDetails} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    </ThemeProvider>
  )
}
export default withRouter(App)
