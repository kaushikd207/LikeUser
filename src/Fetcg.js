import React, { useEffect, useState } from 'react'

function Fetcg() {

  const [data, setData] = useState([])
  const [liked, setLiked] = useState(JSON.parse(localStorage.getItem('liked')) || [])
  const [isClick, setIsClick] = useState(false)

  const apiGet = async () => {
    setIsClick(false)
    const res = await fetch('https://api.randomuser.me/')
    const data = await res.json();
    setData(data.results)
  }

  useEffect(() => {
    apiGet()
    { console.count('run') }
  }, [])

  const handleLike = (payload) => {
    setIsClick(true)
    setLiked(prev => [...prev, payload])
    localStorage.setItem('liked', JSON.stringify([...liked, payload]))
  }
  const handleClear = () => {
    setLiked([])
    localStorage.clear()
  }
  const handleRemove = (id) => {
    console.log(id);
    const filterData = liked.filter(item => item.email !== id)
    setLiked(filterData)
    localStorage.setItem('liked', JSON.stringify(filterData))
  }

  return (
    <div className='content'>
      <div>
        {data.map((item, i) => (
          <div key={i}>

            <img src={item.picture.large} alt="avatar" />
            <h2>{item.name?.first} {item.name?.last}</h2>
            <p>Gender : {item.gender} , <br />Email : {item.email}</p>
            <button disabled={isClick} className='btnLike' onClick={() => handleLike(item)}>Like</button>
            <button className='btn' onClick={apiGet}>Refresh</button>
          </div>
        ))}

      </div>
      {liked.length > 0 && <div>
        <h1 className='likedH1'>Liked Users</h1>
        <button onClick={handleClear}>Clear All Data</button>
        <div className='likeWrapper'>
          {liked.map((item, i) => (
            <div className='likeCard' key={i}>

              <img src={item.picture.large} alt="avatar" />
              <div>
                <h2>{item.name?.first} {item.name?.last}</h2>
                <p>Gender : {item.gender} , <br />Email : {item.email}</p>
                <button onClick={() => handleRemove(item.email)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>}

    </div>
  )
}

export default Fetcg
