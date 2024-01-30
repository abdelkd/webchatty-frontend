import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { socket } from "../socket";
import { Message } from "../types";
import { addNewMessage } from "../services/state/chatReducer";
import clsx from 'clsx'

type ChatBubbleProps = {
  message: Message;
};

const ChatBubble = ({ message }: ChatBubbleProps) => {
  const isSelfMessage = socket.id === message.authorId
  const messageIdentifier = isSelfMessage ? "you:" : "stranger:"

  const identifierStyle = clsx('font-bold', {
    "text-red-500": isSelfMessage,
    "text-blue-500": !isSelfMessage
  })

  return <div className="px-4 py-1 w-fit rounded-lg">
    <span className={identifierStyle}>{messageIdentifier}</span> {" "}
    {message.text}
  </div>;
};

const InfoChatBubble = ({ message }: ChatBubbleProps) => {
  return <div className="flex justify-center items-center">
    <p className="text-gray-800">{message.text}</p>
  </div>
}

const ChatBubbles = () => {
  const messages = useAppSelector((state) => state.chat.messages);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const onMessage = ({ authorId, message, timeStamp }: { authorId: string, message: string, timeStamp: string }) => {
      const newMessage: Message = { authorId, text: message, timeStamp };
      
      dispatch(addNewMessage(newMessage));
    };

    socket.on("message", onMessage);

    return () => {
      socket.off("message", onMessage);
    };
  }, [dispatch]);

  return (
    <div className="h-max px-3 py-2 grow overflow-scroll flex flex-col-reverse gap-1 overflow-x-hidden overflow-y-scroll">
      {messages.length > 0 
        ? messages.map((message) => message.authorId === "server" ? <InfoChatBubble message={message} /> : <ChatBubble key={message.timeStamp} message={message} />
        )
        : null}
    </div>
  );
};

export default ChatBubbles;
