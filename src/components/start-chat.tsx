import { useEffect, useState } from "react"
import { socket } from "../socket"
import { useAppDispatch } from "../hooks/redux-hooks"
import { addNewMessage, setRoomId, turnChatOff, turnChatOn } from "../services/state/chatReducer"
import clsx from "clsx"

const StartChat = () => {
  const [interest, setInterest] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useAppDispatch()
  
  const handleClick = () => {
    if(isLoading) {
      setIsLoading(false)
      socket.disconnect()
      return
    }

    setIsLoading(true)
    socket.connect()
    socket.emit("findMatch", "friend");
  }

  useEffect(() => {
    const onMatch = (room: string) => {
      // setIsLoading(false)
      dispatch(setRoomId(room))
      dispatch(turnChatOn())
      dispatch(addNewMessage({
        text: "you've been matched with someone",
        authorId: "server",
        timeStamp: new Date().toTimeString(),
      }))
    }

    const onNoMatch = () => {
      // setIsLoading(false)
    }

    const leaveRoom = () => {
      // setIsLoading(false)
      dispatch(turnChatOff())
    }

    socket.on('matchFound', onMatch)
    socket.on('noMatch', onNoMatch)
    socket.on('leaveRoom', leaveRoom)

    return () => {
      socket.off('matchFound', onMatch)
      socket.off('leaveRoom', leaveRoom)
      socket.off('noMatch', onNoMatch)
    }
  }, [dispatch])

  const buttonStyles = clsx('px-2 py-1 rounded-md mx-1', {
    "bg-gray-300": isLoading,
    "bg-blue-300": !isLoading,
  })

  return (
    <div className="py-3 px-2">
      <input disabled={isLoading} type="text" className="px-2 py-1 rounded-md" value={interest} onChange={e => setInterest(e.target.value)} />
      <button onClick={handleClick} className={buttonStyles}>{isLoading ? "Cancel" : "Start Chat"}</button>
    </div>
  )
}

export default StartChat