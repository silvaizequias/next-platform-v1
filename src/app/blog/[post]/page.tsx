import { Metadata } from 'next'

//export async function generateStaticParams() {}

//export async function generateMetadata({
//  params,
//}: {
//  params: { post: string }
//}): Promise<Metadata | null> {
//  return {}
//}

export default async function PostPage({
  params,
}: {
  params: { post: string }
}) {
  return params.post
}
