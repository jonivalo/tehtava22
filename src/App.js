import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import backgroundImage from './poke.jpg';
import Coin from './Coin';



function App(){

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
        setCoins(res.data);
    })
    .catch(error => alert('OOOEOEOEOE'));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );


 return (
  <div className="App" style={{ background: `url(${backgroundImage})`}}>
  
   <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Hae kryptovaluutan kurssia</h1>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Hae'
          />
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  </div>

  
     
     
    
 );
}


export default App;