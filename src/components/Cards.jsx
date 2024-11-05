import { useState } from 'react'

function Cards() {
  const [cards] = useState([
    {
      id: 1,
      title: 'Card 1',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' 
    },
    {
      id: 2, 
      title: 'Card 2',
      body: 'Nunc quis massa vel neque laoreet vulputate'
    },
    {
      id: 3,
      title: 'Card 3',  
      body: 'Ut vel enim ut mauris aliquam porta'
    }
  ])

  return (
    <div className="cards">
      {cards.map(card => (
        <div key={card.id} className="card">
          <h3>{card.title}</h3>
          <p>{card.body}</p>
        </div>  
      ))}
    </div>
  )

export default Cards