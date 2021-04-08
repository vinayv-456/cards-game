import { connect } from 'react-redux';
import { putGameState, setGameState } from '../../actions';


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
        updateGameState: (obj) => dispatch(putGameState(obj)),
    }
  }

  
const Cards = (props) => {
    let left = 0;
    let top = 0;

    

    const check = () => {
        const obj= {
            "activeCard": props.activeCard,
            "hasDefusedCard": props.hasDefusedCard,
            "isPending": props.isPending,
            "gameCards": props.cards,
            "score": props.score
        }
        let cards = [...props.cards];
        let openedCard = cards.pop();
        obj.activeCard = openedCard;
        console.log("active card ", openedCard)
        obj.gameCards = cards;
        if(openedCard === "Defuse card 🙅‍♂️")
        obj.hasDefusedCard = true
        else if(openedCard === "Shuffle card 🔀")
        obj.gameCards = null
        else if(openedCard === 'Exploding kitten card 💣')
        {
            if(!obj.hasDefusedCard)
            {
                console.log("game over!, you lost the game!");
                alert("game over!!!")
            }    
        }
        
        console.log("update!!", obj)
        props.updateGameState(obj);
    }
    return(
        <div style={{position:'relative', left:'30px', top:'30px'}} onClick={check}>   
        {
            (props.cards?.length !== 0) && 
            props.cards?.map(card => {
                left = left+10;
                top = top+10;
                return <div 
                        style={{height: '100px',
                          width: '100px',
                          position:'absolute', 
                          left: `${left}px`, 
                          top:`${top}px`,
                          backgroundColor: 'black'
                        }}>
                        {card}
                    </div>
            })
        }    
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards)