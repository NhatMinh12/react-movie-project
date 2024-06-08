import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet' // Header Generator
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Link, Switch, Route, useHistory} from 'react-router-dom'

import { getMovieReviews } from 'resources/reviews/reviews.actions'

import ReviewDetails from 'components/ReviewDetails'
import SearchFilters from 'components/SearchFilters'

export function HomePage(props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [reviews, setReviews] = useState([])
  const [filteredReviews, setFilteredReviews] = useState([])
  const [mpaaRating, setMpaaRating] = useState('')
  const [criticsPick, setCriticsPick] = useState('')
  const [limit, setLimit] = useState(20)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    fetch('./static/movie-reviews.json')
      .then(response => response.json())
      .then(data => {
        setReviews(data)
      })
      .catch(err => console.log(err))
    props.getMovieReviews()
  }, [limit])

  useEffect(() => {
    const filteredData = reviews.filter((review) => {
      const reviewDate = new Date(review.publication_date)
      const start = startDate ? new Date(startDate) : null
      const end = endDate ? new Date(endDate) : null

      return (
        review.display_title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!mpaaRating || review.mpaa_rating === mpaaRating) &&
        (criticsPick === '' || review.critics_pick === parseInt(criticsPick)) &&
        (!start || reviewDate >= start) &&
        (!end || reviewDate <= end)
      )
    })

    setFilteredReviews(filteredData.slice(0, limit))
  }, [searchTerm, mpaaRating, criticsPick, startDate, endDate, limit, reviews])

  return (

    <div>

      <nav>
        <ul>
          <li><Link to="/critics">Critics</Link></li>
        </ul>
      </nav>

      <Switch>

        <Route exact path='/'>

          <div>

            <main>

              <SearchFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                mpaaRating={mpaaRating}
                setMpaaRating={setMpaaRating}
                criticsPick={criticsPick}
                setCriticsPick={setCriticsPick}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />

              <button onClick={() => setLimit(prev => Math.min(prev + 10, 50))}>Load More</button>

              <ul>

                {filteredReviews.map(review => (

                  <li key={review.id}>

                    <Link to={`/home/review/${review.id}`}>
                      <img src={review.multimedia.src} alt={review.display_title} />
                      <h2>{review.display_title}</h2>
                      <p>Publication date: {review.publication_date}</p>
                      <p>MPAA rating: {review.mpaa_rating ? review.mpaa_rating : 'N/A'}</p>
                      <p>Critic's pick: {review.critics_pick}</p>
                    </Link>

                  </li>

                ))}
              </ul>

            </main>

          </div>

        </Route>

        <Route path="/home/review/:id">

          <ReviewDetails reviews={filteredReviews} />

        </Route>

      </Switch>

    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const mapDispatchToProps = dispatch => ({
  getMovieReviews: () => dispatch(getMovieReviews()),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(HomePage)
