import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Text } from 'react-native-paper';
import { useMainContext } from '../contexts/MainContext';
import { ProgressBar, RadioButton, MD3Colors } from 'react-native-paper';


const QuizScreen = () => {
  const {
    score,
    quizCount,
    getQuestionByIndex,
    getQuestionByAnswerId,
    getQuestionOutcome,
    setCurrentQuestionReference,
    setScoreByAnswerId,
    currentQuestionRef
  } = useMainContext();

  const [showIntro, setShowIntro] = useState(true);
  const [title, setTitle] = useState('Welcome Tom!');
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [progressBarValue, setProgressBarValue] = useState(0);
  const [showOutcome, setShowOutcome] = useState(null);
  const [outcome, setOutcome] = useState(null);
  
 useEffect(() => {
    const outcomeQuestion = getQuestionOutcome();
    if(outcomeQuestion) {
      setOutcome(outcomeQuestion);
    }
  
  }, [showOutcome, quizCount]);

  
  /**
   * Handler methods
   */
  const startQuiz = () => {
    const firstQuestion = getQuestionByIndex(0);
    setShowIntro(false);
    setCurrentQuestionReference(firstQuestion);
  }

  const handleSelectAnswer = (value) => {
    setSelectedAnswerId(value);
  }

  const handleClickNextQuestion = () => {
    const nextQuestion = getQuestionByAnswerId(selectedAnswerId);

    setProgressBarValue(progressBarValue + 1);
    setScoreByAnswerId(selectedAnswerId);

    if(nextQuestion) {
      setCurrentQuestionReference(nextQuestion);
    }
    else {
      setShowOutcome(true);
    }
  }


  /** 
  * Partial views to render
  */
  const renderIntro = () => {
    return (
      <>
        <Text variant='bodyLarge' style={styles['bottom-margin-l']}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
        <Button title="Start Quiz" mode="contained" onPress={startQuiz}>
          Start
        </Button>
      </>
    );
  }

  const renderQuiz = () => {
    return (
      <>
        <Text variant="headlineSmall" style={styles['bottom-margin-m']}>
          {currentQuestionRef?.question_text || ''}
        </Text>
        
        <View>
          <View style={styles['bottom-margin-m']}>
            {renderAnswers()}
          </View>
          <Button title="Next" mode="contained" onPress={handleClickNextQuestion}>
            Next
          </Button>
        </View>
      </>
    );
  }

  const renderAnswers = () => {
    return (
      <RadioButton.Group onValueChange={handleSelectAnswer} value={selectedAnswerId}>
        {currentQuestionRef?.answers.map((answer, i) => {
          return <RadioButton.Item key={i} label={answer.label} value={answer.id} />
        })}
      </RadioButton.Group>
    );
  }

  const renderOutcome = () => {
    return (
      <>
        <Text variant="bodyMedium" style={styles['bottom-margin-l']}>
          {outcome.text}
        </Text>
        
        {outcome?.show_booking_button && (
          <View style={styles['bottom-margin-l']}>
            <Button icon="calendar" title="Book meeting" mode="contained">
              Book a meeting with docktor
            </Button>
          </View>
        )}
      </>
    );
  }

  const renderContent = () => {
    if(showIntro){
      return renderIntro();
    }
    else if(outcome) {
      return renderOutcome();
    }
    else {
      return renderQuiz();
    }
  }


  /**
   * Main Render
   */
  return (
    <>
      <ProgressBar progress={quizCount / 100 * progressBarValue} color={MD3Colors.error50} />
      <View style={styles.container}>
        <View style={styles.contentHead}>
          <Text variant="headlineMedium" style={styles.headline}>{title}</Text>
        </View>
        <View style={styles.contentBody}>
          {renderContent()}
          <Text variant="bodySmall">Score: {score}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30
  },
  headline: {
    marginBottom: 20
  },
  'bottom-margin-s': {
    marginBottom: 10
  },
  'bottom-margin-m': {
    marginBottom: 20
  },
  'bottom-margin-l': {
    marginBottom: 30
  }
});


export default QuizScreen;