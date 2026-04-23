import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import Image from 'next/image'

const richTextOptions: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong className="font-semibold">{text}</strong>,
    [MARKS.ITALIC]: (text) => <em>{text}</em>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, children) => (
      <p className="mb-6 font-sans text-lg leading-relaxed text-text-muted">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (_node, children) => (
      <h2 className="mb-4 mt-10 font-serif text-3xl font-bold text-text-primary">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node, children) => (
      <h3 className="mb-3 mt-8 font-serif text-2xl font-bold text-text-primary">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (_node, children) => (
      <h4 className="mb-2 mt-6 font-serif text-xl font-bold text-text-primary">{children}</h4>
    ),
    [BLOCKS.UL_LIST]: (_node, children) => (
      <ul className="mb-6 ml-6 list-disc space-y-2 text-text-muted">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node, children) => (
      <ol className="mb-6 ml-6 list-decimal space-y-2 text-text-muted">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node, children) => (
      <li className="text-lg leading-relaxed">{children}</li>
    ),
    [BLOCKS.QUOTE]: (_node, children) => (
      <blockquote className="my-8 border-l-4 border-accent pl-6 italic text-text-muted">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="my-10 border-t border-white/10" />,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { file, title, description } = node.data.target.fields
      const url = file?.url?.startsWith('//') ? `https:${file.url}` : file?.url
      if (!url) return null
      return (
        <figure className="my-10">
          <Image
            src={url}
            alt={(description as string) || (title as string) || 'Blog image'}
            width={file.details?.image?.width ?? 1200}
            height={file.details?.image?.height ?? 800}
            className="w-full rounded-lg"
          />
          {title && (
            <figcaption className="mt-3 text-center text-sm text-text-muted">
              {title as string}
            </figcaption>
          )}
        </figure>
      )
    },
    [INLINES.HYPERLINK]: (node, children) => (
      <a
        href={node.data.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline underline-offset-4 transition-colors hover:text-accent/80"
      >
        {children}
      </a>
    ),
  },
}

interface RichTextBodyProps {
  document: any
}

export default function RichTextBody({ document }: RichTextBodyProps) {
  if (!document) return null
  return <div>{documentToReactComponents(document, richTextOptions)}</div>
}
