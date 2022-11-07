import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const url = "http://localhost:4000/questions";
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((questions) => setQuestions(questions));
  }, []);
  // console.log(questions)

  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const updatedQuestions = questions.filter((q) => q.id !== id);
        setQuestions(updatedQuestions);
      });
  }
  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((q) => {
          if (q.id === updatedQuestion.id) return updatedQuestion;
          return q;
        });
        setQuestions(updatedQuestions);
      });
  }

  const questionItems = questions.map((qI) => (
    <QuestionItem
      key={qI.id}
      question={qI}
      onAnswerChange={handleAnswerChange}
      onDeleteClick={handleDeleteClick}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul className="question-items">{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
