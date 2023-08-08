import { HStack } from '../../elements/LayoutPrimitives'
import { StyledText } from '../../elements/StyledText'
import { Sidebar } from 'phosphor-react'
import { theme } from '../../tokens/stitches.config'
import { Button } from '../../elements/Button'
import { ExportIcon } from '../../elements/icons/ExportIcon'
import { useCallback, useMemo } from 'react'
import { UserBasicData } from '../../../lib/networking/queries/useGetViewerQuery'
import { ReadableItem } from '../../../lib/networking/queries/useGetLibraryItemsQuery'
import { useGetArticleQuery } from '../../../lib/networking/queries/useGetArticleQuery'
import { highlightsAsMarkdown } from '../homeFeed/HighlightItem'
import { showSuccessToast } from '../../../lib/toastHelpers'

type NotebookHeaderProps = {
  viewer: UserBasicData
  item: ReadableItem

  setShowNotebook: (set: boolean) => void
}

export const NotebookHeader = (props: NotebookHeaderProps) => {
  const { articleData } = useGetArticleQuery({
    slug: props.item.slug,
    username: props.viewer.profile.username,
    includeFriendsHighlights: false,
  })

  const exportHighlights = useCallback(() => {
    if (articleData?.article.article.highlights) {
      const markdown = highlightsAsMarkdown(
        articleData?.article.article.highlights
      )
      ;(async () => {
        await navigator.clipboard.writeText(markdown)
        showSuccessToast('Highlights and notes copied')
      })()
    }
  }, [articleData])

  return (
    <HStack
      distribution="center"
      alignment="center"
      css={{
        width: '100%',
        position: 'sticky',
        top: '0px',
        height: '50px',
        p: '20px',
        borderTopLeftRadius: '10px',
        overflow: 'clip',
        background: '$thNotebookBackground',
        zIndex: 10,
        borderBottom: '1px solid $thNotebookBorder',
      }}
    >
      <StyledText style="modalHeadline" css={{ color: '$thNotebookSubtle' }}>
        Notebook
      </StyledText>
      <HStack
        css={{
          ml: 'auto',
          cursor: 'pointer',
          gap: '15px',
          mr: '-5px',
        }}
        distribution="center"
        alignment="center"
      >
        {/* <Dropdown triggerElement={<MenuTrigger />}>
          <DropdownOption
            onSelect={() => {
              // exportHighlights()
            }}
            title="Export Notebook"
          />
          <DropdownOption
            onSelect={() => {
              // setShowConfirmDeleteNote(true)
            }}
            title="Delete Article Note"
          />
        </Dropdown> */}

        <Button
          style="plainIcon"
          onClick={(event) => {
            exportHighlights()
            event.preventDefault()
          }}
        >
          <ExportIcon
            size={25}
            color={theme.colors.thNotebookSubtle.toString()}
          />
        </Button>
        <Button style="plainIcon" onClick={() => props.setShowNotebook(false)}>
          <Sidebar size={25} color={theme.colors.thNotebookSubtle.toString()} />
        </Button>
      </HStack>
    </HStack>
  )
}
