import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Footer from '../Footer'
import './index.css'
import {useTheme} from '../../ThemeContextProvider/ThemeContext'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const Home = () => {
  const {isDarkTheme} = useTheme()
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
  })
  const fetchData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    setApiResponse({...apiResponse, status: apiStatusConstants.inProgress})
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {books} = data
      setApiResponse({
        status: apiStatusConstants.success,
        data: books,
      })
    } else {
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
    const updatedData = data.map(each => ({
      id: each.id,
      authorName: each.author_name,
      coverPic: each.cover_pic,
      title: each.title,
    }))
    return (
      <>
        <Slider {...settings}>
          {updatedData.map(each => {
            const {id, authorName, coverPic, title} = each
            return (
              <Link to={`/books/${id}`} className="link-container" key={id}>
                <div className="slick-item-container">
                  <img className="cover-image" src={coverPic} alt={title} />
                  <h1
                    className={`book-title ${isDarkTheme ? 'dark' : 'light'}`}
                  >
                    {title}
                  </h1>
                  <p
                    className={`book-author ${isDarkTheme ? 'dark' : 'light'}`}
                  >
                    {authorName}
                  </p>
                </div>
              </Link>
            )
          })}
        </Slider>
      </>
    )
  }

  const renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dmethdigg/image/upload/v1713874782/Group_7522failureview-top-rated_ibucpa.png"
        alt="failure view"
        className="register-prime-image"
      />
      <p>Something went wrong, Please try again.</p>
      <button
        type="button"
        className="failure-button"
        onClick={() => fetchData()}
      >
        Try Again
      </button>
    </div>
  )

  const renderLoadingView = () => (
    <div className="books-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  const renderTopRatedBooks = () => {
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

  const darkMode = isDarkTheme ? 'dark' : 'light'

  return (
    <>
      {/* Header isDarkTheme={isDarkTheme} */}
      <div className={`app-container ${darkMode}`}>
        <div>
          <h1 className={`home-head ${darkMode}`}>
            Find Your Next Favorite Books?
          </h1>
          <p className={`home-para ${darkMode}`}>
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <Link to="/shelf" className="link-item">
            <button type="button" className="find-books-button-mobile">
              Find Books
            </button>
          </Link>
          <div className={`slick-container ${darkMode}`}>
            <div className="find-book-container">
              <h1 className={`slick-head ${darkMode}`}>Top Rated Books</h1>
              <Link to="/shelf" className="link-item">
                <button type="button" className="find-books-button">
                  Find Books
                </button>
              </Link>
            </div>
            {renderTopRatedBooks()}
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Home
