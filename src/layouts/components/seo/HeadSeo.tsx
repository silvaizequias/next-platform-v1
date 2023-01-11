import Head from 'next/head'
import themeConfig from 'src/configs/themeConfig'

interface Props {
  title: string
  description?: string
  image?: string
}
export default function HeadSeo({ title, description, image }: Props) {
  return (
    <Head>
      <meta name='description' content={description} />
      <title>
        {title} - {themeConfig.templateName}
      </title>
      <meta
        property='og:title'
        content={themeConfig.templateName}
        key='title'
      />
      <meta property='og:image' content={image} />
      <meta
        name='og:description'
        property='og:description'
        content={description}
      />
    </Head>
  )
}
