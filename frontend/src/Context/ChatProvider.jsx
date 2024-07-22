  import { useEffect } from "react";
  import { createContext, useContext, useState } from "react";
  import { useNavigate } from "react-router-dom";

  const ChatContext = createContext();

  const ChatProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(); 
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);
    const [notification, setNotification] = useState([]);

    useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        setUser(userInfo);
      } else {
        // Redirect to login if userInfo is not available
        navigate("/");
      }
    }, [navigate]); // useEffect dependency array should only include navigate

    return (
      <ChatContext.Provider
        value={{
          user,
          setUser,
          selectedChat,
          setSelectedChat,
          chats,
          setChats,
          notification,
          setNotification,
        }}
      >
        {children}
      </ChatContext.Provider>
    );
  };

  // Correct usage of useContext
  export const ChatState = () => {
    const context = useContext(ChatContext);
    if (!context) {
      throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
  };

  export default ChatProvider;
