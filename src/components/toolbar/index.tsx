import { FiLogIn } from 'react-icons/fi'
import SwitchMode from '../switch-mode'

export default function ToolBar() {
  return (
    <div className="flex items-center gap-4">
      <SwitchMode />
      <span className="text-xl cursor-pointer rounded-full p-2 dark:hover:bg-lunar-900 hover:bg-lunar-50">
        <FiLogIn />
      </span>
    </div>
  )
}
