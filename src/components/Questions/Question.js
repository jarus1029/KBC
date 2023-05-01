import React, { useState } from 'react'
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import "./Questions.css";
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

const Questions = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  score,
  setScore}) => {
  const [selected,setSelected]=useState();
  const [error,setError]=useState(false);

  const handleSelect=(i)=>{
    if(selected===i && selected===correct)
    return 'select';
    else if(selected===i && selected!==correct)
    return 'wrong';
    else if(i===correct)
    return 'select';
  };
  const navigate=useNavigate();
  const handleCheck=(i)=>{
    setSelected(i);
    if(i===correct)
    setScore(score+1);
    setError(false);
  }

  const handleNext=()=>{
    if(currQues>8)
    {
      navigate('/result');
    }
    else if(selected)
    {
    setCurrQues(currQues+1);
    setSelected();
    }
    else
    {
      setError("Please Select an option first");
    }
  }

  const handleQuit=()=>{

  }
  const entities = {
    '&#039;': "'",
    '&quot;': '"',
    // add more if needed
  };
  // console.log(currQues);
  console.log(questions[currQues].question);
  const replaced=questions[currQues].question.replaceAll("&#039;","'").replaceAll("&quot;",'"');
  console.log(replaced);
  return (
    <div className='question'>
      
      <h1>Question {currQues+1}</h1>
      <div className='singleQuestion'>
      {/* {questions[currQues].question.replace(/&#?\w+;/, match => entities[match])} */}
      
        <h2>{replaced}</h2>

        <div className='options'>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {options && options.map((i)=><button 
          onClick={()=>handleCheck(i)}
        className={`singleOption ${selected && handleSelect(i)}`} 
        key={i}
        disabled={selected}
        >{i}</button>)}
        </div>
        <div className='controls'>
          <Button
          variant="contained"
          color='secondary'
          size='large'
          style={{width:185}}
          href="/"
          onClick={handleQuit}
          >Quit</Button>


          <Button
          variant="contained"
          color='secondary'
          size='large'
          style={{width:185}}
          onClick={handleNext}
          >Next Question
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Questions
