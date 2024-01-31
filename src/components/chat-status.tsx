import clsx from "clsx"
import { useAppSelector } from "../hooks/redux-hooks"


const ChatStatus = () => {
  const isConnected = useAppSelector(state => state.chat.isConnected)
  const statusStyle = clsx("w-28 h-28 rounded-full", {
    "bg-green-500": isConnected,
    "bg-red-500": !isConnected,
  })

  return (
    <div className={statusStyle}></div>
  )
}

export default ChatStatus
