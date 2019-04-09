import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const StyledTimer = styled.div`
  display: grid;
  grid-template: repeat(8, 1fr) / repeat(5, 1fr);

  .display{
    grid-row: 1 / 8;
    grid-column: 1 / 6;
    box-shadow: 0 5px 8px rgba(0,0,0,.3);
    width: 100%;

  }
  button{
    display: block;
    grid-row: 7 / 9 ;
    padding: .5rem 2rem;
    width: 150px;
    margin: 0 auto;
    background-color: #fff;
    box-shadow: -5px 2px 4px rgba(0,0,0,.2);
    color: deeppink;
    border: none;
    border-radius: 4px;
    font-size: 1.9rem;
    &:focus{
      outline: none;
    }
    &:hover{
      background-color: deeppink;
      color: #fff;
      transform: scale(1.3);
      transition: color .3s, background-color .3s, box-shadow .2s, transform .2s;
      box-shadow: -5px 2px 4px rgba(0,0,0,.4);

    }
    &:active{
        box-shadow: none;
        transform: scale(0.95);
        transition: box-shadow .3s, transform .2s;
    }
  }
  #start_stop{
    grid-column: 2;
  };
  #reset{
    grid-column: 4;
  }

`
const Display = styled.div`
  background-color: #333;
  color: ${props => props.timeLeft <= 59 ? "red" : "yellowgreen"};
  width: 300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 5rem;
  border: 1px #ddd solid;
  border-radius: 8px;
  border-bottom: none;
  #timer-label{
    font-size: 2rem;
  }
`
export default function Timer(props){
    const [display, setDisplay] = useState(formatDisplay(props.timeLeft))
  
    function formatDisplay(time){
      let seconds = time % 60;
      let minutes =  Math.round((time - seconds) / 60);
      return `${minutes < 10 ? "0"+minutes : minutes}:${seconds < 10 ? "0"+seconds : seconds}`;
    }
    // format display on every change of timeLeft
    useEffect(()=> {
      setDisplay(formatDisplay(props.timeLeft));
    },[props.timeLeft]);
  
    return (
        <StyledTimer >
            <Display className="display" timeLeft={props.timeLeft}>
                <h1 id="timer-label">{props.type}</h1>
                <span id="time-left">{display}</span>
            </Display>
            <button onClick={props.startPause} id="start_stop">
                {props.isRunning ? <i className="fas fa-pause" /> : <i className="fas fa-play" />}
            </button>
            <button onClick={props.reset} id="reset">Reset</button>

        </StyledTimer>

    )
  }