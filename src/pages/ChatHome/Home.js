import MessageContainer from "../../Components/messages/MessageContainer";
import Sidebar from "../../Components/ChatSidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col sm:flex-row sm:w-full md:w-[80%] lg:w-[45%] rounded-lg overflow-hidden bg-cyan-900 bg-opacity-90 text-white">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
