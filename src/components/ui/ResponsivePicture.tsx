type ResponsiveSource = {
  srcSet: string
  media?: string
  type?: string
}

type ResponsivePictureProps = {
  alt: string
  className?: string
  decoding?: 'async' | 'sync' | 'auto'
  fetchPriority?: 'high' | 'low' | 'auto'
  height: number
  loading?: 'eager' | 'lazy'
  sizes?: string
  sources?: ResponsiveSource[]
  src: string
  width: number
}

export function ResponsivePicture({
  alt,
  className,
  decoding = 'async',
  fetchPriority,
  height,
  loading = 'lazy',
  sizes,
  sources = [],
  src,
  width,
}: ResponsivePictureProps) {
  return (
    <picture className={className}>
      {sources.map((source) => (
        <source key={`${source.media ?? 'default'}-${source.srcSet}`} media={source.media} srcSet={source.srcSet} type={source.type} />
      ))}
      <img
        alt={alt}
        decoding={decoding}
        fetchPriority={fetchPriority}
        height={height}
        loading={loading}
        sizes={sizes}
        src={src}
        width={width}
      />
    </picture>
  )
}
