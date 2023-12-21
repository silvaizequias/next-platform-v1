import PostListView from './views/PostListView'
import CreatePostForm from './views/forms/CreatePostForm'

export default function BlogAdminScreen() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex justify-center bg-slate-100 rounded-md p-4 shadow-md">
        <CreatePostForm />
      </div>
      <div className="w-full flex flex-1 bg-slate-50 rounded-md p-4 shadow-md">
        <div className="flex flex-col">
          <PostListView />
        </div>
      </div>
    </div>
  )
}
