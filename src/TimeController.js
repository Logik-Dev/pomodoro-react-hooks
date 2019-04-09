import React from 'react';
import styled from 'styled-components';

const StyledTimeController = styled.div`
  background-color: ${props => props.type === "session" ? "deepskyblue" : "green"};
  color: #fff;
  text-align: center;
  font-size: 1.5rem;
  padding: 2rem;
  width: 300px;
  margin: ${props => props.type ==='session' ? "-1.3rem auto" : "1.6rem auto"};
  border-radius: 8px;
  box-shadow: -8px 5px 8px rgba(0,0,0,.3);
  .time-control{
    font-size: 2.5rem;
    font-weight: 800;
    margin-top: 10px;
    display: grid;
    grid-template-columns: 2fr 1fr 2fr;
  }
  .fa-plus, .fa-minus{
      color: gray;
      
      &:hover{
          transform: scale(1.3);
          transition: transform .2s;
      }
  }
`

export default function TimeController(props) {
    return(
      <StyledTimeController id={props.type+"-label"} type={props.type}>
            <h3 className="header">{props.type} Time:</h3>
            <div className="time-control">
              <i className="fas fa-plus" id={props.type+"-increment"} onClick={props.inc}/>
              <span className="duration" id={props.type+"-length"}>{props.duration}</span>
              <i className="fas fa-minus" id={props.type+"-decrement"} onClick={props.dec}/>
            </div>
      </StyledTimeController>
    )
  }

