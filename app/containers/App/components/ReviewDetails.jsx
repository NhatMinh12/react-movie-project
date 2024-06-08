import React from 'react'
import { useParams } from 'react-router-dom'

const ReviewDetails = ({ reviews }) => {
  const { id } = useParams()
  const review = reviews.find(review => review.id === parseInt(id))

  if (!review) {
    return <div>Review not found</div>
  }

  return (
    <div>
      <h1>{review.display_title}</h1>
      <img src={review.multimedia.src} alt={review.display_title} />
      <p> MPAA rating: {review.mpaa_rating ? review.mpaa_rating : 'N/A'}</p>
      <p> {review.critics_pick ? 'Critics Pick' : 'Not a Critics Pick'}</p>
      <h2> Headline: {review.headline}</h2>
      <p> Summary: {review.summary_short}</p>
      <p> By: {review.byline}</p>
      <a href={review.link.url} target="_blank" rel="noopener noreferrer">{review.link.suggested_link_text}</a>
    </div>
  )
}

export default ReviewDetails
