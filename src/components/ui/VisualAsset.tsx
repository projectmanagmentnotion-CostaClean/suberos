import { PortfolioMedia } from '../../data/portfolioProjects'
import { MediaFrame } from './MediaFrame'
import { ResponsivePicture } from './ResponsivePicture'
import { AssetPlaceholder } from './AssetPlaceholder'
import { VisualSequencePlaceholder } from './VisualSequencePlaceholder'

type VisualAssetProps = {
  asset?: PortfolioMedia
  caption?: string
  priority?: boolean
  ratio?: 'square' | 'portrait' | 'landscape' | 'cinema' | 'auto'
}

export function VisualAsset({ asset, caption, priority = false, ratio = 'landscape' }: VisualAssetProps) {
  if (!asset) {
    return (
      <MediaFrame
        caption={caption}
        media={<AssetPlaceholder label="No media loaded" title="Visual slot ready" variant="service" />}
        ratio={ratio}
      />
    )
  }

  if (asset.type === 'sequence') {
    return (
      <MediaFrame
        caption={caption}
        media={<VisualSequencePlaceholder frameCount={asset.width} label={asset.id} />}
        ratio={ratio}
      />
    )
  }

  if (asset.type === 'document') {
    return (
      <MediaFrame
        caption={caption}
        media={<AssetPlaceholder label="Document asset" title={asset.id} variant="service" />}
        ratio={ratio}
      />
    )
  }

  if (asset.type === 'video') {
    return (
      <MediaFrame
        caption={caption}
        media={
          <video controls playsInline poster={asset.poster} preload={priority ? 'metadata' : 'none'}>
            <source src={asset.src} />
          </video>
        }
        ratio={ratio}
      />
    )
  }

  return (
    <MediaFrame
      caption={caption}
      media={
        <ResponsivePicture
          alt={asset.decorative ? '' : asset.alt ?? ''}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          height={asset.height}
          loading={priority ? 'eager' : 'lazy'}
          sources={asset.mobileSrc ? [{ media: '(max-width: 40rem)', srcSet: asset.mobileSrc }] : undefined}
          src={asset.src}
          width={asset.width}
        />
      }
      ratio={ratio}
    />
  )
}
