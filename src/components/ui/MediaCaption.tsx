type MediaCaptionProps = {
  children: string
}

export function MediaCaption({ children }: MediaCaptionProps) {
  return <figcaption className="media-caption">{children}</figcaption>
}
