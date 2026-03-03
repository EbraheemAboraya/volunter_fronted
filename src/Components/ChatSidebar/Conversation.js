import React, { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ converstaion, lastIdx }) => {
  const [imageData, setImageData] = useState("");
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === converstaion._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(converstaion._id);

  useEffect(() => {
    if (converstaion && converstaion.image) {
      const base64String = btoa(
        converstaion.image.image.data.reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      setImageData(`data:${converstaion.contentType};base64,${base64String}`);
    } else {
      setImageData("default_image_url");
    }
  }, [converstaion]);



  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
        onClick={() => setSelectedConversation(converstaion)}
      >
				<div className={`avatar ${isOnline ? "online" : ""}`}>
          {" "}
          {/* Edit ONLINE based on the server response to offline */}
          <div className="w-12 rounded-full">
            <img src={imageData} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-black">{converstaion.fullName}</p>
            <span className="text-xl">😚</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divder my-0 py-0 h-1" />}
      <div className="divider my-0 py-0 h-1" />
    </>
  );
};

export default Conversation;
