import UploadScreen from './screen'

export default async function UploadPage() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center">
      <div className="py-12">
        <div className="flex justify-center">
          <UploadScreen />
        </div>
      </div>
    </section>
  )
}
