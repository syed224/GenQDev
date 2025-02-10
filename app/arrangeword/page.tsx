"use client";

import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";
import { useMedia } from "react-use";
import iqraWords from "./iqraWords";
import "./styles.css";
//import "global.css";

class AudioPlayer {
  private correctAudio: HTMLAudioElement | null = null;
  private incorrectAudio: HTMLAudioElement | null = null;

  
  constructor() {
    if (typeof window !== "undefined") {
      this.correctAudio = new Audio("./correct.wav");
      this.incorrectAudio = new Audio("./incorrect.wav");
    }
  }

  playCorrect() {
    if (this.correctAudio) {
      this.correctAudio.currentTime = 0;
      this.correctAudio.play();
    }
  }

  playIncorrect() {
    if (this.incorrectAudio) {
      this.incorrectAudio.currentTime = 0;
      this.incorrectAudio.play();
    }
  }
}


export default function ArrangeWord() {
  const [questionWord, setQuestionWord] = useState(""); // Current iqra word
  const [userAnswer, setUserAnswer] = useState<string[]>([]); // User's answer in dropzones
  const [isCorrect, setIsCorrect] = useState<"none" | "wrong" | "correct">(
    "none"
  ); // Answer status

  const audioPlayer = new AudioPlayer(); // Initialize the audio player

  // Set a random word when the component mounts
  useEffect(() => {
    changeWord();
  }, []);

  // Handle drag and drop actions
  const handleDrop = (index: number, letter: string) => {
    const newAnswer = [...userAnswer];
    newAnswer[index] = letter;
    setUserAnswer(newAnswer);
  };

  // Handle letter selection for drop zones
  const handleSelectLetter = (letter: string) => {
    const emptyIndex = userAnswer.findIndex((l) => l === "");
    if (emptyIndex !== -1) {
      const newAnswer = [...userAnswer];
      newAnswer[emptyIndex] = letter;
      setUserAnswer(newAnswer);
    }
  };

  // Remove letter from drop zone
  const handleRemoveLetter = (index: number) => {
    const newAnswer = [...userAnswer];
    newAnswer[index] = "";
    setUserAnswer(newAnswer);
  };

  // Check if the user's answer is correct
  const handleCheck = () => {
    if (!userAnswer.includes("")) {
      if (userAnswer.join("") === questionWord) {
        setIsCorrect("correct");
        audioPlayer.playCorrect();
      } else {
        setIsCorrect("wrong");
        audioPlayer.playIncorrect();
      }
    }
  };

  // Reset the answer input
  const handleReset = () => {
    setUserAnswer(Array(questionWord.length).fill(""));
    setIsCorrect("none");
  };

  // Change the current word to a new random word
  const changeWord = () => {
    const randomWord = iqraWords[Math.floor(Math.random() * iqraWords.length)];
    setQuestionWord(randomWord);
    setUserAnswer(Array(randomWord.length).fill(""));
    setIsCorrect("none");
  };

  const letters = questionWord.split(""); // Split word into individual letters
  const shuffledLetters = [...letters].sort(() => Math.random() - 0.5); // Shuffle letters

  // Enable the Reset button when at least one letter is dropped
  const isResetEnabled = userAnswer.some((letter) => letter !== "");
  // Enable the Check button when all drop zones are filled
  const isCheckEnabled = !userAnswer.includes("");

  return (
    <div className="container">
      <Header />

      {/* Display the current iqra word */}
      <h1 className="question">{questionWord}</h1>

      {/* Drop zones for arranging letters */}
      <div className="dropzones" style={{ direction: "rtl" }}>
        {userAnswer.map((letter, index) => (
          <div
            key={index}
            className="dropzone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(index, e.dataTransfer.getData("text"))}
            onClick={() => handleRemoveLetter(index)}
          >
            {letter ? letter : <span>-</span>}
          </div>
        ))}
      </div>

      {/* Letter selection area */}
      <div className="letters" style={{ direction: "ltr" }}>
        {shuffledLetters.map((letter, index) => (
          <div
            key={index}
            className="letter"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text", letter)}
            onClick={() => handleSelectLetter(letter)}
          >
            {letter}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-16">
        <Button
          disabled={!isResetEnabled}
          onClick={handleReset}
          size="lg"
          variant="danger"
          className="w-1/2 sm:w-52"
        >
          Reset
        </Button>

        <Button
          onClick={changeWord}
          size="lg"
          variant="default"
          className="w-1/2 sm:w-52"
        >
          Change Word
        </Button>
      </div>

      {/* Footer with status and action buttons */}
      <Footer
        onCheck={handleCheck}
        onReset={handleReset}
        onChangeWord={changeWord}
        status={isCorrect}
        disabledCheck={!isCheckEnabled}
        disabledReset={!isResetEnabled}
      />
    </div>
  );
}