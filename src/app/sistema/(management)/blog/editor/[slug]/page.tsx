import UnauthorizedAccess from '@/components/unauthorized-access'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libraries/next-auth'
import BlogEditorSlugScreen from './screen'

export default async function BlogEditorSlugPage() {
  const session = await getServerSession(authOptions)

  return session && session.user?.profile == 'MASTER' ? (
    <div className="flex flex-col justify-center">
      <div className="max-w-full py-20">
        <div className="mx-2 sm:mx-8">
          <h4 className="text-lg sm:text-2xl uppercase py-4">Editar Postagem</h4>
          <BlogEditorSlugScreen />
        </div>
      </div>
    </div>
  ) : (
    <UnauthorizedAccess />
  )
}
