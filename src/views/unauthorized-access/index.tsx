import ButtonWithAction from '@/components/button-with-action'
import PageSection from '@/components/page-section'

export default function UnauthorizedAccess() {
  return (
    <PageSection
      subtitle="Acesso não autorizado!"
      description="Você não tem permissão para acessar esta página"
    >
      <div className="flex justify-center">
        <ButtonWithAction name="Ir para o início" path={'/'} />
      </div>
    </PageSection>
  )
}
