import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import AuthService from "../AuthService";
import TutorialDataService from "../Service";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const token = AuthService.getToken("authToken");
      const res = await TutorialDataService.sendMessage(token,selectedConversation._id ,message);
      if (res.error) throw new Error(res.error);

      setMessages([...messages, res]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;
