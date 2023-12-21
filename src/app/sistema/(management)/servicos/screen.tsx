import CreateServiceItemForm from './views/items/forms/CreateServiceItemForm'
import CreateServiceOrderForm from './views/orders/forms/CreateServiceOrderForm'

export default function ServiceScreen() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex justify-center bg-slate-50 rounded-md p-4 shadow-md">
        <div className="flex flex-col justify-center gap-4">
          <CreateServiceOrderForm />
          <div className="border border-spacing-2 mx-4"></div>
          <CreateServiceItemForm />
        </div>
      </div>
      <div className="w-full flex flex-1 bg-slate-50 rounded-md p-4 shadow-md">
        <div className="flex flex-col">...</div>
      </div>
    </div>
  )
}
