export default async function SubdomainPage({
  params,
}: {
  params: { subdomain: string }
}) {
  const subdomain = params?.subdomain

  return subdomain
}
