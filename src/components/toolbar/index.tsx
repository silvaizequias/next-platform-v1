import SwitchTheme from '../switch-theme'
import UserBar from '../userbar'

export default function ToolBar() {
  return (
    <div className="flex gap-4">
      <SwitchTheme />
      <UserBar />
    </div>
  )
}
