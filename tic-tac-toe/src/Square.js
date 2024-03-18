export function Square({value, onSquareClick, highlight}){
    return <button className={highlight ? "square highlighted" : "square"} 
                   onClick={onSquareClick}>
                    {value}
           </button>;
  }