import CreateSupportCategoryForm from './views/categories/forms/CreateSupportCategoryForm'
import CreateSupportTicketForm from './views/tickets/forms/CreateSupportTicketForm'

export default function SupportScreen() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex justify-center bg-slate-100 rounded-md p-4 shadow-md">
        <div className="flex flex-col gap-4">
          <CreateSupportCategoryForm />
          <div className=" border border-spacing-4 mx-4"></div>
          <CreateSupportTicketForm />
        </div>
      </div>
      <div className="w-full flex flex-1 bg-slate-50 rounded-md p-4 shadow-md">
        <div className="flex flex-col">...</div>
      </div>
    </div>
  )
}
