import { useEffect, useRef } from "react";
import Message from "./Message"; // Assuming this is imported correctly from the correct file path
import useGetMessages from "../../hooks/useGetMessages"; // Assuming this custom hook is correctly implemented
import MessageSkeleton from "../../skeletons/MessageSkeleton";

const Messages = () => {
  const { messages, loading } = useGetMessages(); // Assuming this custom hook returns the messages and loading state correctly
  const lastMessageRef = useRef();

  return (
    <div className="px-4 overflow-auto max-h-[400px]">
      {!loading &&
        messages.length > 0 &&
        Object.keys(messages).map(messageKey => (
          <div key={messageKey} ref={lastMessageRef}>
            <Message message={messages[messageKey]} />
          </div>
        ))
      }

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
