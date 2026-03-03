import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import AuthService from "../AuthService";
import TutorialDataService from "../Service";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const [UserData, setUserData] = useState({ data: {} });

	useEffect(() => {
	  async function getUserData() {

		const token = AuthService.getToken("authToken");
		if (token !== null){
			const userData = await TutorialDataService.getUserData(token);
			setUserData(userData.data);
		}
  
	  }
	  getUserData();
	}, []);



	useEffect(() => {
		if (UserData) {
			const socket = io("https://volunteers-1.onrender.com", {
				query: {
					userId: UserData.id,
				},
			});

			setSocket(socket);

			// socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [UserData]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
