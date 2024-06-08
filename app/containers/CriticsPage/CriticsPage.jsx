import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CriticsPage = () => {
  const [critics, setCritics] = useState([])
  const [reviews, setReviews] = useState([])
  const [aggregatedCritics, setAggregatedCritics] = useState([])

  useEffect(() => {
    Promise.all([
      fetch('/static/critics.json').then(response => response.json()),
      fetch('/static/movie-reviews.json').then(response => response.json())
    ])
      .then(([criticsData, reviewsData]) => {
        setCritics(criticsData)
        setReviews(reviewsData)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if (critics.length > 0) {
      const criticsMap = aggregateCriticsData(critics, reviews)
      setAggregatedCritics(criticsMap)
    }
  }, [critics, reviews])

  const aggregateCriticsData = (critics, reviews) => {
    const criticsMap = {}

    critics.forEach(critic => {
      criticsMap[critic.display_name.toLowerCase()] = {
        ...critic,
        reviewsCount: 0,
        criticsPickCount: 0
      }
    })

    reviews.forEach(review => {
      const bylineLowerCase = review.byline.toLowerCase()
      if (criticsMap[bylineLowerCase]) {
        criticsMap[bylineLowerCase].reviewsCount += 1
        if (review.critics_pick) {
          criticsMap[bylineLowerCase].criticsPickCount += 1
        }
      }
    })

    return Object.values(criticsMap)
  }

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
      </nav>
      <h1>Critics</h1>
      <ul>
        {aggregatedCritics.map((critic) => (
          <li key={critic.display_name}>
            {critic.multimedia && critic.multimedia.resource.src && (
              <img src={critic.multimedia.resource.src} alt={critic.display_name} />
            )}
            <h2>{critic.display_name}</h2>
            <p dangerouslySetInnerHTML={{ __html: critic.bio }}></p>
            <p>Total Reviews: {critic.reviewsCount}</p>
            <p>Critics Pick: {critic.criticsPickCount}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CriticsPage
