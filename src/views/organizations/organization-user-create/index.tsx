import { OrganizationType } from "@/types/organization"
import OrganizationUserCreateForm from "./OrganizationUserCreateForm"

interface Props {
    organizations: OrganizationType[]
}

export default function OrganizationUserCreate(props: Props){
    const {organizations} = props

    return <OrganizationUserCreateForm organizations={organizations} />
}