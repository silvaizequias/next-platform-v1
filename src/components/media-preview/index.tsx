/* eslint-disable @next/next/no-img-element */
interface Props {
  src: string
  media: string
}

export default function MediaPreview(props: Props) {
  const { src, media } = props
  return (
    <div className="relative shadow-md my-2">
      {media == 'video' ? (
        <video className="rounded-md" src={src} controls />
      ) : media == 'image' ? (
        <img className="rounded-md" src={src} alt="Preview File" />
      ) : (
        <p className="p-2 text-xs text-center rounded-md">
          sem pré visualização disponível para arquivos do tipo{' '}
          <span className="font-semibold">{media}</span>{' '}
        </p>
      )}
    </div>
  )
}
