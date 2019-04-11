import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import Timer from './Timer';
import TimeController from './TimeController';
import accurateInterval from 'accurate-interval';

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template: 100px 1fr / 1fr;
  grid-gap: 2rem;
  grid-template-areas:
  "header"
  "content";
`
const Header = styled.header`
  @import url('https://fonts.googleapis.com/css?family=Carter+One');
  grid-area: header;
  background-color: #333;
  color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Carter One', cursive;
  font-size: 1.8rem;
  letter-spacing: 2px;
`
const Content = styled.main`
  grid-area: content;
`
const Footer = styled.footer`
  position: absolute;
  bottom: 0; left: 0; right: 0;
  background-color: #333;
  color: #fff;
  font-style: italic;
  padding: 1rem;
  text-align: right;
  a{
    text-decoration: none;
    color: deeppink;
  }
`

function App(props){

  // Definitions
  const [durations, setDurations] = useState({break: 5, session: 25});
  const [isRunning, setIsRunning] = useState(false);
  const [isWorking, setIsWorking] = useState(true);
  const [timeLeft, setTimeLeft] = useState(isWorking ? durations.session * 60 : durations.break * 60);
  const audioRef = useRef();
  // update timeLeft when changing durations
  useEffect(() => {
    setDurations({...durations, break: durations.break})
  }, [durations.break]);

  useEffect(() => {
    setDurations({...durations, session: durations.session})
  }, [durations.session]);

  useEffect(() => {
    if(!isRunning){
      isWorking ? setTimeLeft(durations.session * 60) : setTimeLeft(durations.break * 60);
    }
  }, [durations])
  // define custom hook 
  function useInterval(callback, delay){
    const savedCallback = useRef();

    // save callback
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // manage interval
    useEffect(() => {
      function callTick(){
        savedCallback.current();
      };
      // passing a null delay will not start interval
      if(delay !== null){
        const id = accurateInterval(callTick, 1000);
        return () => id.clear();
      }
    }, delay)
  }
  // use custom hook
  useInterval(()=> {
    if(timeLeft > 0){
      setTimeLeft(timeLeft - 1);
    }
    if(timeLeft === 0){
      handleEndTimer()
    }
   
  }, isRunning ? 1000 : null);

  // handle start pause clicked
  function startPause(e){
    setIsRunning(!isRunning);
  }

  // handle end of timer
  function handleEndTimer(){
    audioRef.current.play();
    setIsWorking(!isWorking);
    setTimeLeft(isWorking ? durations.break * 60 : durations.session * 60);
  }
  // increment
  function increment(type){
    if(durations[type] < 60  && !isRunning){
      setDurations({...durations, [type]: durations[type] + 1});
    }
  }
  // decrement
  function decrement(type){
    if(durations[type] > 1 && !isRunning){
      setDurations({...durations, [type]: durations[type] - 1});
     
    }
  }
  function reset(){
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsRunning(false);
    setDurations({session: 25, break: 5});
    setIsWorking(true);
    setTimeLeft(25 * 60);
  }

  // RENDER
  return (
    
    <Wrapper>
      <Header><h1>Pomodoro</h1></Header>
      <Content>
          <Timer 
          timeLeft={timeLeft} 
          type={isWorking ? "Session" : "Break"}
          isRunning={isRunning}
          startPause={startPause}
          reset={reset}/>

        { ['session', 'break'].map(word => 
          <TimeController
          key={word} 
          type={word} 
          inc={() => increment(word)} 
          dec={() => decrement(word)} 
          duration={durations[word]}/>)}
      </Content>
      <audio src="http://onj3.andrelouis.com/phonetones/unzipped/Palm-Treo800W/Alarm5.wav" id="beep" preload="auto" ref={audioRef}/> 
      <Footer>Created by <a href="https://logikdev.fr" target="_blank">LogikDev</a></Footer>
    </Wrapper>
  )
}



export default App;
