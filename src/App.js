import { useEffect, useState } from "react";
import ChatWindow from "./ChatWindow";

import { Divider, Button, Typography, App } from "antd";
const { Title } = Typography;

function Main() {
  const [isChatWindow, setIsChatWindow] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const handleFetchCourses = async () => {
      const courses = await fetch(
        "https://kippa-chatbot-be-production.up.railway.app/api/v1/courses"
      );
      const courseToJSON = await courses.json();
      setCourses(courseToJSON.resource);
    };
    handleFetchCourses();
  }, []);
  return (
    <App>
      <div className="App" style={{ textAlign: "center" }}>
        {isChatWindow ? (
          <ChatWindow courses={courses} setIsChatWindow={setIsChatWindow} />
        ) : (
          <>
            <Title>Welcome</Title>
            <Divider type="horizontal" />
            <Button type="primary" onClick={() => setIsChatWindow(true)}>
              Start
            </Button>
          </>
        )}
      </div>
    </App>
  );
}

export default Main;
