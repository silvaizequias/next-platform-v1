import BlogEditorView from './views/BlogEditorView'

export default function BlogEditorScreen() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center bg-slate-100 rounded-md p-4 shadow-md">
        <BlogEditorView method='POST' />
      </div>
    </div>
  )
}
