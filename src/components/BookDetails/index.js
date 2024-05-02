import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'
import Footer from '../Footer'
import {useTheme} from '../../ThemeContextProvider/ThemeContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const BookDetails = props => {
  const {isDarkTheme} = useTheme()
  const darkMode = isDarkTheme ? 'dark' : 'light'
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
  })

  const fetchData = async () => {
    const {match} = props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    setApiResponse({...apiResponse, status: apiStatusConstants.inProgress})

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const bookDetails = data.book_details
        const bookData = {
          id: bookDetails.id,
          title: bookDetails.title,
          readStatus: bookDetails.read_status,
          rating: bookDetails.rating,
          authorName: bookDetails.author_name,
          coverPic: bookDetails.cover_pic,
          aboutBook: bookDetails.about_book,
          aboutAuthor: bookDetails.about_author,
        }
        setApiResponse({
          status: apiStatusConstants.success,
          data: bookData,
        })
      } else {
        throw new Error('Failed to fetch data')
      }
    } catch (error) {
      setApiResponse({
        ...apiResponse,
        status: apiStatusConstants.failure,
      })
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const renderSuccessView = () => {
    const {data} = apiResponse
    const {
      title,
      readStatus,
      rating,
      authorName,
      coverPic,
      aboutAuthor,
      aboutBook,
    } = data

    return (
      <div className={`book-details-container ${darkMode}`}>
        <div className="image-and-details-container">
          <img src={coverPic} className="coverpic-image" alt={title} />
          <div className={`details-container ${darkMode}`}>
            <h1 className={`book-title ${darkMode}`}>{title}</h1>
            <p className={`book-author ${darkMode}`}>{authorName}</p>
            <div className={`rating-container ${darkMode}`}>
              <p className={`rating-para ${darkMode}`}>Avg Rating </p>
              <BsFillStarFill className="star-icon" />
              <p>{rating}</p>
            </div>
            <div className={`status-container ${darkMode}`}>
              <p className={`status-para ${darkMode}`}>Status: </p>
              <p className={`status-span ${darkMode}`}>{readStatus}</p>
            </div>
          </div>
        </div>
        <hr />
        <h1 className={`autor-head ${darkMode}`}>About Author</h1>
        <p className={`about-author ${darkMode}`}>{aboutAuthor}</p>
        <h1 className={`autor-head ${darkMode}`}>About Book</h1>
        <p className={`about-author ${darkMode}`}>{aboutBook}</p>
      </div>
    )
  }

  const renderFailureView = () => (
    <div className="failure-view-container-book-details">
      <img
        src="https://res.cloudinary.com/dmethdigg/image/upload/v1713874782/Group_7522failureview-top-rated_ibucpa.png"
        alt="failure view"
        className="register-prime-image"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" className="failure-button" onClick={fetchData}>
        Try Again
      </button>
    </div>
  )

  const renderLoadingView = () => (
    <div className="books-loader-container-book-details" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  const renderBookDetails = () => {
    const {status} = apiResponse
    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <div className={`booksDetails-app-container ${darkMode}`}>
      {renderBookDetails()}
      <Footer />
    </div>
  )
}

export default BookDetails
