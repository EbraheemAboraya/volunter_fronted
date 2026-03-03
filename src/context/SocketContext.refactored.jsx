import { createContext, useState, useEffect, useContext, useCallback } from "react";
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
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get socket URL from environment
  const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "https://volunteers-1.onrender.com";

  // Fetch user data once on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = AuthService.getToken("authToken");
        if (token) {
          const response = await TutorialDataService.getUserData(token);
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle socket connection
  useEffect(() => {
    if (!userData?.id || isLoading) {
      return;
    }

    // Create socket connection
    const newSocket = io(SOCKET_URL, {
      query: {
        userId: userData.id,
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Connection successful
    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    // Listen for online users updates
    newSocket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    // Handle connection errors
    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    // Handle disconnection
    newSocket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, [userData, isLoading, SOCKET_URL]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, userData, isLoading }}>
      {children}
    </SocketContext.Provider>
  );
};
