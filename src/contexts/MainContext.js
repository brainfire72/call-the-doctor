import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchQuestions } from '../services/fetchQuestions'; 

const MainContext = createContext();

export function MainProvider({ children }) {
  const [quizdata, setQuizdata] = useState([]);
  const [quizCount, setQuizCount] = useState(0);
  const [score, setScore] = useState(0);
  const [currentQuestionRef, setCurrentQuestionRef] = useState(null);
  const [answers, setAnswers] = useState({});
  const [outcome, setOutcome] = useState(null);

  useEffect(() => {
    async function loadQuestions () {
        const data = await fetchQuestions();
        setQuizdata(data);
        setQuizCount(data?.questions.length);
    }

    loadQuestions();

  }, []);


  /**
   * Getter methods
   * @param {*} index 
   * @returns 
   */
  const getQuestionByIndex = (index) => {
    return quizdata?.questions[index] || null;
  };

  const getQuestionById = (id) => {
    return quizdata?.questions.find((question) => question.id === id);
  }

  const getOutcomeById = (id) => {
    return quizdata?.outcomes.find((outcome) => outcome.id === id);
  }

  const getQuestionByAnswerId = (answerId) => {
    const question = currentQuestionRef?.next.find((next) => next.answered === answerId) || currentQuestionRef?.next[0];
    return getQuestionById(question.next_question) || null;
  }

  const getQuestionOutcome = () => {
    const hasOutcome = currentQuestionRef?.next.find((item) => item.outcome);
    
    if(hasOutcome) {
      let scoreIndex = 0;

      currentQuestionRef.next.forEach((outcome, i) => {
        if(score > outcome?.max_score) {
          scoreIndex = i + 1;
        }
      });
      
      const outcomeId = currentQuestionRef.next[scoreIndex].outcome;
      const outcome = getOutcomeById(outcomeId);
      setOutcome(getOutcomeById(outcomeId));

      return outcome;
    }
  }


  /**
   * Setter methods
   * @param {*} questionObject 
   */
  const setCurrentQuestionReference = (questionObject) => {
    setCurrentQuestionRef(questionObject);
  }

  const setScoreByAnswerId = (answerId) => {
    const answer = currentQuestionRef?.answers.find((answer) => answer.id === answerId);
    if(answer?.score) {
      const updatedScore = score + answer.score;
      setScore(updatedScore);
      return updatedScore;
    }
  }


  /**
   * Store methods
   * @param {*} question
   */
  const addAnswer = (question) => {
    //setAnswers(prev => ({ ...prev }));
  };


  return (
    <MainContext.Provider value={{
      quizdata,
      quizCount,
      currentQuestionRef,
      score,
      outcome,
      getQuestionByIndex,
      getQuestionById,
      getQuestionByAnswerId,
      getQuestionOutcome,
      setCurrentQuestionReference,
      setScoreByAnswerId
      }}>
      {children}
    </MainContext.Provider>
  );
}

export function useMainContext() {
  return useContext(MainContext);
}
