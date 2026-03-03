import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessage } from "react-icons/ti";
import useConversation from "../../zustand/useConversation";
import AuthService from "../../AuthService";
import TutorialDataService from "../../Service";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [userData, setUserData] = useState(null); // State to store user data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = AuthService.getToken("authToken");
        const response = await TutorialDataService.getUserData(token);
        setUserData(response.data); // Set user data in state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData(); // Call the fetchData function when component mounts
  }, []); // Empty dependency array to ensure useEffect runs only once

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected userData={userData} />
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">
              {selectedConversation.fullName}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

const NoChatSelected = ({ userData }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {userData && userData.name}</p>
        <p>Select a chat to start messaging</p>
        <TiMessage className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

export default MessageContainer;
