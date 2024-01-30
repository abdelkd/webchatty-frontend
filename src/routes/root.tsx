import { useEffect } from "react";
import { socket } from "../socket";
import ChatForm from "../components/chat-form";
import ChatBubbles from "../components/chat-bubbles";
import ChatStatus from "../components/chat-status";
import StartChat from "../components/start-chat";
import { useAppSelector } from "../hooks/redux-hooks";


const Root = () => {
  const isConnected = useAppSelector(state => state.chat.isConnected)

  useEffect(() => {
    const onConnect = () => {

    };

    const onDisconnect = () => {

    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <section className="w-screen h-dvh bg-slate-100 flex flex-col">
      <ChatStatus />

      <ChatBubbles />
      {isConnected ? <ChatForm /> : <StartChat />}
    </section>
  );
};

export default Root;
