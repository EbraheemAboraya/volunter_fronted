import React, { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";
import AuthService from "../../AuthService";
import TutorialDataService from "../../Service";

const Message = ({ message }) => {
  const [UserData, setUserData] = useState({ data: {} });

  useEffect(() => {
    async function getUserData() {
      const token = AuthService.getToken("authToken");
      const userData = await TutorialDataService.getUserData(token);

      setUserData(userData.data);
    }
    getUserData();
  }, []);

  const fromMe = message.senderId === UserData.id;

  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const formattedTime = extractTime(message.createdAt);
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar"></div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
