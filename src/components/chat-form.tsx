import { ChangeEvent, FormEventHandler, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks"
import { setMessage, addNewMessage, turnChatOff } from "../services/state/chatReducer"
import { socket } from "../socket"

const ChatForm = () => {
  const message = useAppSelector(state => state.chat.message)
  const roomId = useAppSelector(state => state.chat.roomId)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const onLeaveRoom = () => {
      dispatch(addNewMessage({
        text: "user disconnected",
        authorId: "server",
        timeStamp: new Date().toTimeString(),
      }))
      dispatch(turnChatOff())
    }

    socket.on('leaveRoom', onLeaveRoom)

    return () => {
      socket.off('leaveRoom', onLeaveRoom)
    }
  }, [])

  const authorId = socket.id

  const sendMessage: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if(authorId && message.length > 0) {
      const timeStamp = new Date().toTimeString()
      const newMessage = { roomId, message, timeStamp }
      
      socket.emit("sendMessage", newMessage)

      dispatch(setMessage(""))
    }

  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setMessage(e.target.value))
  }

  return (
      <form onSubmit={sendMessage} className="px-2 my-4 w-full flex">
        <input type="submit" className="rounded-md h-12 px-10 mr-2 bg-blue-300 border-none focus-within:outline-none" value={message.length === 0 ? "Close" : "Send"} />
        <input type="text" className="rounded-md border border-gray-700 grow px-1 focus-within:outline-none" value={message} onChange={handleChange} />
      </form>
  )
}

export default ChatForm
