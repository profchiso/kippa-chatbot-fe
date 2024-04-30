import React, { useState } from "react";
import { Button, Divider, Typography, App, Space, Radio } from "antd";
const { Title } = Typography;

function ChatWindow({ courses, setIsChatWindow }) {
  const { notification } = App.useApp();
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    if (e.target.value === currentQuestion.answer) {
      notification.success({ message: "You got the answer correctly" });
      setValue(e.target.value);
    } else {
      setValue(e.target.value);
      notification.error({
        message: `You got the answer incorrectly the correct answer is ${currentQuestion.answer}`,
      });
    }
  };

  const [display, setDisplay] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const course = courses[0];
  const lessons = course.lessons;
  const sections = lessons[currentLessonIndex]?.sections;
  const questions = lessons[currentLessonIndex]?.questions;

  const nextSection = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    } else {
      if (questions && questions.length > 0) {
        // There are questions at the end of this lesson
        setDisplay("Questions");
        setCurrentQuestionIndex(0);
      } else {
        nextLesson();
      }
    }
  };

  const nextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setCurrentSectionIndex(0);
      setDisplay("Lesson");
    } else {
      notification.info({
        message: `Congratulations 🎉 you have successfully finished ${course.title}.`,
      });
      setIsChatWindow(false);
    }
  };

  const submitAnswer = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      nextLesson();
    }
  };

  const currentSection = sections[currentSectionIndex];
  const currentQuestion = questions && questions[currentQuestionIndex];

  return (
    <App>
      <div>
        <Title
          level={5}
        >{` You have been successfully enrolled into ${course.title}`}</Title>
        {display === "Introduction" && (
          <div>
            <Title>{display}</Title>
            <Divider />
            <div>{course.introduction}</div>
            <Divider />
            <Button onClick={() => setDisplay("Lesson")}>Continue</Button>
          </div>
        )}
        {display === "Lesson" && (
          <div>
            <Title level={3}>{lessons[currentLessonIndex]?.title}</Title>
            <Title level={4}>{currentSection?.title}</Title>
            <Divider />
            <p>{currentSection?.description}</p>
            <Divider />
            <Button onClick={nextSection}>Continue</Button>
          </div>
        )}
        {display === "Questions" && (
          <div>
            <Title>Question</Title>
            <p>{currentQuestion?.question}</p>
            <Divider />
            <Radio.Group onChange={onChange} value={value}>
              <Space direction="vertical">
                <Radio value={"A"}>{currentQuestion?.optionA}</Radio>
                <Radio value={"B"}>{currentQuestion?.optionB}</Radio>
                <Radio value={"C"}>{currentQuestion?.optionC}</Radio>
              </Space>
            </Radio.Group>
            <Divider />
            <div>
              <Button onClick={submitAnswer}>Continue</Button>
            </div>
          </div>
        )}
        {display === "" && (
          <div>
            <Button onClick={() => setDisplay("Introduction")}>Continue</Button>
          </div>
        )}
      </div>
    </App>
  );
}

export default ChatWindow;
