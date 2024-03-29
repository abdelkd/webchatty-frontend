import clsx from "clsx"
import { useAppSelector } from "../hooks/redux-hooks"


const ChatStatus = () => {
  const isConnected = useAppSelector(state => state.chat.isConnected)
  const statusStyle = clsx("w-7 h-7 rounded-full", {
    "bg-green-500": isConnected,
    "bg-red-500": !isConnected,
  })

  return (
    <div className="w-8 h-8">
      <div className={statusStyle}></div>
    </div>
  )
}

export default ChatStatus
