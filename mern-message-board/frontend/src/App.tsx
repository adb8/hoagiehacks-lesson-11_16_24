import { useState, useEffect } from "react";
import MessageBoard from "./components/MessageBoard";
import CreateMessage from "./components/CreateMessage";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fetchMessages = async () => {
      axios
        .get("http://localhost:5000/messages")
        .then((response) => {
          const messages = response.data.messages;
          setMessages(messages);
          console.log(messages);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchMessages();
  }, []);

  return (
    <div className="flex flex-col items-center m-5">
      <CreateMessage />
      {messages && <MessageBoard messages={messages} />}
    </div>
  );
}

export default App;
