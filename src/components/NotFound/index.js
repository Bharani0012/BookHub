import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dmethdigg/image/upload/v1714636396/Group_7484notfound_xx7xxp.png"
      alt="not found"
    />
    <h1>Page Not Found</h1>
    <p>
      we are sorry, the page you requested could not be found,Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button className="not-found-button" type="button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
