import './App.css';
import { connect } from 'react-redux';
import { requestGameState } from './actions';

import Cards from './components/cards/cards'
import { useEffect } from 'react';

const mapStateToProps = (state) => {
  return {
    robots: state.cards,
    isPending: state.isPending
  }
}

// dispatch the DOM changes to call an action. note mapStateToProps returns object, mapDispatchToProps returns function
// the function returns an object then uses connect to change the data from redecers.
const mapDispatchToProps = (dispatch) => {
  return {
    onRequestGameState: () => dispatch(requestGameState())
  }
}

function App() {

  useEffect(()=>{
    props.onRequestGameState();
  }, [])
  console.log("props: ", props)
  // const deckOfCards = () => {

  // }
  return (
    <div style={{display:'flex'}}>
      <div className="container" style={{display:'flex', flex:'2'}}>
        <h1 style={{textAlign:'center'}}>😸 Exploding Kitten</h1>
        <Cards />
      </div>
      <div className="container" style={{display:'flex', flex:'1'}}>
        <h1 style={{textAlign:'center'}}>Leaderboard</h1>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
