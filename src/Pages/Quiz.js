import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Question from '../components/Questions/Question';
import './Quiz.css'

const Quiz = ({ name, questions, setQuestions, score, setScore }) => {
  const [options, setOptions] = useState();
  const [currQues, setCurrQues] = useState(0);



  useEffect(() => {
    // console.log(name);
    // console.log(questions);

    setOptions(questions &&
      handleshuffle([
        questions[currQues]?.correct_answer,
        ...questions[currQues]?.incorrect_answers,
      ])
    );
  }, [questions,currQues]);

  const handleshuffle = (optionss) => {
    return optionss.sort(() => Math.random() - 0.5);
  };
  

  // console.log(options);
  return (
    <div className='quiz'>
      <span className='subtitle'>Welcome ,{name} </span>
      {questions ? (
        <>

          <div className='quizInfo'>
            <span>{questions[currQues].category}</span>
            <span>Score : {score}</span>
          </div>

          <Question
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
            options={options}
            correct={questions[currQues]?.correct_answer}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
          />
        </>) : (
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      )}
    </div>
  )
}

export default Quiz;