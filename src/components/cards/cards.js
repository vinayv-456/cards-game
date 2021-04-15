import { connect } from 'react-redux';
import { putGameState, setGameState } from '../../actions';


const mapStateToProps = (state) => {
    return {
      user_name: state.gameState?.user_name,
      cards: state.gameState?.gameCards,
      isPending: state.gameState?.isPending,
      score: state.gameState?.score,
      hasDefusedCard: state.gameState?.hasDefusedCard,
      activeCard: state.gameState?.activeCard
    }
  }
  
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
            "user_name": props.user_name,
            "activeCard": props.activeCard,
            "hasDefusedCard": props.hasDefusedCard,
            "isPending": props.isPending,
            "gameCards": props.cards,
            "score": props.score
        }
        let cards = [...props.cards];
        let openedCard = cards.pop();
        obj.activeCard = openedCard;
        obj.gameCards = cards;
        if(openedCard === "Defuse card 🙅‍♂️")
        obj.hasDefusedCard = true
        else if(openedCard === "Shuffle card 🔀")
        {
            obj.gameCards = null
            obj.hasDefusedCard = false
        }
        else if(openedCard === 'Exploding kitten card 💣')
        {
            if(!obj.hasDefusedCard)
            {
                confirmation();
                
                function confirmation(){
                    if (window.confirm(`game over!, you lost the game!, your score is ${obj.score} \n Do you want to play new game`)) {
                        obj.gameCards = null;
                    }
                }

            } else {
                obj.hasDefusedCard = false
            }    
        }
        
        // incrementing the score. 
        // case 1
        if(openedCard === "Exploding kitten card 💣" && props.hasDefusedCard === true)
        {
            if(obj.gameCards?.length === 0 || obj.gameCards === null)
            {
                obj.score = parseInt(obj.score) + 1; 
                confirmation();

                function confirmation(){
                    if (window.confirm(`You won the game!!!, your score is ${obj.score} \n Do you want to play new game`)) {
                        obj.gameCards = null;
                    }
                }
            }
            props.updateGameState(obj);
            return;    
        }
        //case 2
        if(openedCard !== "Shuffle card 🔀" && openedCard !== "Exploding kitten card 💣")
        {
            if(obj.gameCards?.length === 0 || obj.gameCards === null)
            {
                obj.score = parseInt(obj.score) + 1; 
                confirmation();

                function confirmation(){
                    if (window.confirm(`You won the game!!!, your score is ${obj.score} \n Do you want to play new game`)) {
                        obj.gameCards = null;
                    }
                }
            }
        }
        props.updateGameState(obj);
    }
    return(
        <div>
            <h3>Tap on the deck to reveal the card</h3>
            <div style={{position:'relative', top:'30px'}} onClick={check}>   
            {
                (props.cards?.length !== 0) && 
                props.cards?.map(card => {
                    left = left+10;
                    top = top+10;
                    return <div> 
                        <div 
                            style={{height: '100px',
                            width: '100px',
                            position:'absolute', 
                            left: `${left}px`, 
                            top:`${top}px`,
                            backgroundColor: 'black'
                            }}>
                            {/* {card} */}
                        </div>
                    </div>
                })
            }    
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards)