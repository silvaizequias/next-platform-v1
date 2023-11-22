import ButtonWithAction from '../button-with-action'
import PageSection from '../page-section'

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
