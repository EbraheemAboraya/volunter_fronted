import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import AuthService from "../AuthService";
import TutorialDataService from "../Service";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const token = AuthService.getToken("authToken");
        const res = await TutorialDataService.getMessages(
          token,
          selectedConversation._id
        );

        if (res.error) throw new Error(res.error);

        if (Array.isArray(res.data.messages)) {
          setMessages(res.data.messages);
        } else {
          setMessages([]);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
