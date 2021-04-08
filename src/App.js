import './App.css';
import { connect } from 'react-redux';
import { requestGameState, setGameState } from './actions';

import Cards from './components/cards/cards'
import { useEffect } from 'react';

const mapStateToProps = (state) => {
  return {
    cards: state.gameCards,
    isPending: state.isPending,
    score: state.score,
    hasDefusedCard: state.hasDefusedCard,
    activeCard: state.activeCard
  }
}

// dispatch the DOM changes to call an action. note mapStateToProps returns object, mapDispatchToProps returns function
// the function returns an object then uses connect to change the data from redecers.
const mapDispatchToProps = (dispatch) => {
  return {
    onRequestGameState: () => dispatch(requestGameState()),
    ifNewUser: (obj) => dispatch(setGameState(obj))
  }
}

function App(props) {

  useEffect(()=>{
    props.onRequestGameState();
  }, [])
  console.log("props: ", props)
  
  const deckOfCards = () => {
    if(!props.cards)
    {
      const charaters = ["Cat card 😼"
        , "Defuse card 🙅‍♂️"
        , "Shuffle card 🔀"
        , "Exploding kitten card 💣"]
      const randomDeck = [];
      for(let i=0; i<5 ;i++){
        randomDeck.push(charaters[Math.floor(Math.random() * 4)])
      }
      console.log("random: ", randomDeck )
      const obj = {
        "gameCards": randomDeck,
        "hasDefuseCard": false, 
        "activeCard": null, 
        "user_name": "vinay"
      }
      props.ifNewUser(obj);
    }
  }

  return (
    <div style={{display:'flex'}}>
      {deckOfCards()}
      <div className="container" style={{display:'flex', flex:'2'}}>
        <h1 style={{textAlign:'center'}}>😸 Exploding Kitten</h1>
        <Cards />
        <h1 style={{marginTop:'300px', textAlign:'center'}}>{props.activeCard}</h1>
      </div>
      <div className="container" style={{display:'flex', flex:'1'}}>
      <h1 style={{textAlign:'center'}}>Leaderboard</h1>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
