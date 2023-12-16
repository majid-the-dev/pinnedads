import { GoDotFill } from "react-icons/go";

const Active = () => {
  return (
    <div className="w-full flex h-full flex-1 items-center justify-start gap-2">
        <GoDotFill className="text-green-500" />
        <h1>active campaigns</h1>
    </div>
  )
}

export default Active