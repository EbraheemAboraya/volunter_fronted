import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AuthService from "../AuthService";
import TutorialDataService from "../Service";


const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const token = AuthService.getToken("authToken");
				const res = await TutorialDataService.getConversations(
				  token
				);

				if (res.error) {
					throw new Error(res.error);
				}
				setConversations(res.data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;
