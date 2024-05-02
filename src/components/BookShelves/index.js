import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {useEffect, useState} from 'react'
import {BsSearch, BsFillStarFill} from 'react-icons/bs'
import './index.css'
import Footer from '../Footer'
import {useTheme} from '../../ThemeContextProvider/ThemeContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]
const BookShelves = () => {
  const {isDarkTheme} = useTheme()
  const darkMode = isDarkTheme ? 'dark' : 'light'
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
  })
  const [shelfType, setShelfType] = useState('ALL')
  const [searchInput, setSearchInput] = useState('')
  const [searchText, setSearchText] = useState('')
  const getCurrentShelf = () => {
    const currentShelf = bookshelvesList.find(each => each.value === shelfType)
    return currentShelf.label
  }

  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
  }
  const onClickSearch = () => {
    setSearchText(searchInput)
  }
  const fetchData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${shelfType}&search=${searchText}`
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
        data: books,
        status: apiStatusConstants.success,
      })
    } else {
      setApiResponse({...apiResponse, status: apiStatusConstants.failure})
    }
    setSearchInput('')
  }

  useEffect(() => {
    fetchData()
  }, [shelfType, searchText])

  const renderSuccessView = () => {
    const {data} = apiResponse
    const updatedData = data.map(each => ({
      id: each.id,
      authorName: each.author_name,
      coverPic: each.cover_pic,
      rating: each.rating,
      readStatus: each.read_status,
      title: each.title,
    }))
    const shouldShowBookList = updatedData.length > 0
    return shouldShowBookList ? (
      <ul className={`books-list ${darkMode}`}>
        {updatedData.map(each => {
          const {id, authorName, coverPic, rating, readStatus, title} = each
          return (
            <Link to={`/books/${id}`} key={id}>
              <li className={`list-book ${darkMode}`}>
                <img src={coverPic} alt={title} className="cover-pic" />
                <div>
                  <h1 className={`book-title-bookshelf ${darkMode}`}>
                    {title}
                  </h1>
                  <p className={`book-autor ${darkMode}`}>{authorName}</p>
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
              </li>
            </Link>
          )
        })}
      </ul>
    ) : (
      <div className="no-books-view">
        <img
          src="https://res.cloudinary.com/dmethdigg/image/upload/v1714128456/Asset_1_1nobooks_qbbwnf.png"
          alt="no books view"
        />
        <p>Your search for {searchText} did not find any matches.</p>
      </div>
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
      <button type="button" className="failure-button" onClick={fetchData}>
        Try Again
      </button>
    </div>
  )

  const renderLoadingView = () => (
    <div className="books-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  const renderBooks = () => {
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
    <>
      <div className={`bookshelf-body-container ${darkMode}`}>
        <div className={`bookshelf-app-container ${darkMode}`}>
          <div className="mobile-search-container">
            {' '}
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                className="search-bar"
                value={searchInput}
                onChange={onChangeSearchInput}
              />
              <button
                className="search-icon"
                testid="searchButton"
                type="button"
                onClick={onClickSearch}
              >
                <BsSearch style={{fontSize: '14px'}} />
              </button>
            </div>
            <div className={`mobile-shelf-container ${darkMode}`}>
              <h1 className={`book-shelf-mobile-head ${darkMode}`}>
                Bookshelves
              </h1>
              <ul className={`shelf-list-mobile ${darkMode}`}>
                {bookshelvesList.map(each => {
                  const {id, value, label} = each
                  return (
                    <li
                      key={id}
                      value={value}
                      className={`mobile-shelf-list-item ${darkMode}`}
                    >
                      <button
                        type="button"
                        className={`mobile-shelf-button ${
                          shelfType === value ? 'active-mobile' : ''
                        } ${darkMode}`}
                        onClick={() => {
                          setSearchText('')
                          setShelfType(value)
                        }}
                      >
                        {label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className={`shelf-container ${darkMode}`}>
            <h1 className={`book-shelf-head ${darkMode}`}>Bookshelves</h1>
            <ul className={`shelf-list-desktop ${darkMode}`}>
              {bookshelvesList.map(each => {
                const {id, value, label} = each
                return (
                  <li key={id} value={value} className="">
                    <button
                      type="button"
                      className={`shelf-button ${
                        shelfType === value ? 'active' : ''
                      } ${darkMode}`}
                      onClick={() => {
                        setSearchText('')
                        setShelfType(value)
                      }}
                    >
                      {label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="books-container">
            <div className="books-search-section">
              <h1 className="shelf-type-head">{`${getCurrentShelf()} Books`}</h1>
              <div className="search-container">
                <input
                  type="search"
                  placeholder="Search"
                  className="search-bar"
                  value={searchInput}
                  onChange={onChangeSearchInput}
                />
                <button
                  className="search-icon"
                  data-testid="searchButton"
                  type="button"
                  onClick={onClickSearch}
                >
                  <BsSearch style={{fontSize: '14px'}} />
                </button>
              </div>
            </div>
            <div>{renderBooks()}</div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default BookShelves
