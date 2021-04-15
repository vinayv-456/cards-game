import './App.css';
import { connect } from 'react-redux';
import { requestGameState, setGameState, getLeaderBoard, setUserName } from './actions';

import Cards from './components/cards/cards'
import { useEffect } from 'react';

const mapStateToProps = (state) => {
  return {
    user_name: state.gameState?.user_name,
    cards: state.gameState?.gameCards,
    isPending: state.gameState?.isPending,
    score: state.gameState?.score,
    hasDefusedCard: state.gameState?.hasDefusedCard,
    activeCard: state.gameState?.activeCard,
    users: state.getLeaderBoard?.userScores
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestGameState: (user_name) => dispatch(requestGameState({user_name})),
    ifNewUser: (obj) => dispatch(setGameState(obj)),
    onRequestLeaderBoard: () => dispatch(getLeaderBoard()),
    setUserName: (name) => dispatch(setUserName(name))
  }
}

function App(props) {

  useEffect(()=>{
    let userName = enterName();
    props.onRequestGameState(userName);
    props.onRequestLeaderBoard();
  }, [])

  useEffect(() => {
    if(!props.isPending) {
      deckOfCards();
    }
  }, [props.isPending])
  
  const deckOfCards = () => {
    if(!props?.cards || props.cards?.length === 0)
    { 
      const charaters = ["Cat card 😼"
        , "Defuse card 🙅‍♂️"
        , "Shuffle card 🔀"
        , "Exploding kitten card 💣"]
      const randomDeck = [];
      for(let i=0; i<5 ;i++){
        randomDeck.push(charaters[Math.floor(Math.random() * 4)])
      }
      const obj = {
        "gameCards": randomDeck,
        "hasDefuseCard": false, 
        "activeCard": null, 
        "user_name": props?.user_name,
        "score": props?.score
      }
      props.ifNewUser(obj);
    }
  }

  const enterName = () => {
    if(!props.user_name)
    {
      let name = prompt("enter your name!")
      props.setUserName(name)
      return name;
    }
  }

  return (
    <div style={{display:'flex'}}>
      <div className="container" style={{display:'flex', flex:'2'}}>
        <h1 style={{textAlign:'center'}}>😸 Exploding Kitten</h1>
        <div style={{display:'flex', justifyContent:'center'}}>
          <Cards />
        </div>
        {
          props.activeCard
          ?
          <h1 style={{marginTop:'300px', textAlign:'center'}}>Active Card: {props.activeCard}</h1>
          :
          <h1 style={{marginTop:'300px', textAlign:'center'}}>---</h1>
        }
        {
          props.score
          ?
          <h1 style={{marginTop:'100px', textAlign:'center'}}>score: {props.score}</h1>
          :
          <h1 style={{marginTop:'100px', textAlign:'center'}}>score: ---</h1>
        }
      </div>
      <div className="container" style={{display:'flex', flex:'1'}}>
      <h1 style={{textAlign:'center'}}>Leaderboard</h1>
      {
        (Object.keys(props.users)).map(user=>{
          return <div style={{borderBottom: '2px solid', margin: '10px', padding:'3px', display:'flex'}}>
            <div className="equi">{user}: </div>
            {
              (user===props.user_name)
              ?
              <div className="equi">{props.score} </div>
              :
              <div className="equi">{props.users[user]} </div>
            }
            </div>
        })
      }
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
