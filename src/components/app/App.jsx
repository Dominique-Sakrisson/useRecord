import React, {useState, useEffect} from 'react';

const useRecord = (init) => {
  const [current, setCurrent] = useState(init);
  const [history, setHistory] = useState([init]);
  const [hiLimitErr, setHiLimitErr] = useState(false);
  const [lowLimitErr, setLowLimitErr] = useState(false);

  function undo(){
    let currentIndex = history.indexOf(current);
    if(history[currentIndex - 1] === undefined){
      setLowLimitErr(true);
      return;
    }
    setHiLimitErr(false);
    let toIndex = --currentIndex;
    setCurrent(history[toIndex]);
  }

  function redo(){
    let currentIndex = history.indexOf(current);
    if(history[currentIndex + 1] === undefined || history[currentIndex] === history.length ){
      setHiLimitErr(true);
      return;
    } 
      setLowLimitErr(false);
      let toIndex = ++currentIndex;
      setCurrent(history[toIndex]);
  }

  function record(value){
    let arr = history;
    arr.push(value);
    setHiLimitErr(false)
    setLowLimitErr(false)
    setCurrent(value);
    setHistory(arr);
  }
  
  
  return{current, undo, redo, record, history, hiLimitErr, lowLimitErr};
};

function App() {
  const { current, undo, redo, record, history, hiLimitErr, lowLimitErr } = useRecord('#FF0000');
  
  return (
    <>
      <button onClick={undo}>undo</button>
      <button onClick={redo}>redo</button>
      <input type="color" value={current} onChange={({ target }) => record(target.value)} />
      <div style={{width: '250px', height: '250px', padding: '10px', background: `${current}`}}>hi</div>
      <div>
        {lowLimitErr ? <p>Cannot undo anymore, redo or choose a new color</p> : ''}
        {hiLimitErr ? <p>Cannot redo anymore, undo or choose a new color</p> : ''}
        <p>Your history</p>
        {history.map((histItem) => {
        return <li>color {histItem}</li>}
        )}
      </div>
    </>
  )
}

export default App;
