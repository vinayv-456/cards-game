const Cards = () => {
    const cards = ['Cat card 😼',
         'Defuse card 🙅‍♂️',
         'Shuffle card 🔀',
         'Exploding kitten card 💣'
        ]
    let left = 0;
    let top = 0;
    return(
        <div style={{position:'relative', left:'30px', top:'30px'}}>   
        {
            cards && 
            cards.map(card => {
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

export default Cards;