import type { TextEditor, TextEditorDecorationType } from 'vscode'
import { DecorationRangeBehavior, MarkdownString, window } from 'vscode'
import type { HighlightRange } from './transformPlatform'
import { HIGHTLIGHT_COLOR } from './constants'
import { findClosestPlatform } from './utils/findClosestPlatform'

const UnderlineDecoration = window.createTextEditorDecorationType({
  textDecoration: 'none; border-bottom: 1px dashed currentColor',
  cursor: 'pointer',
  rangeBehavior: DecorationRangeBehavior.ClosedClosed,
})

function createPlatformColorDecoration(color: string) {
  return window.createTextEditorDecorationType({
    color,
    rangeBehavior: DecorationRangeBehavior.ClosedClosed,
    backgroundColor: `${color}3C`,
  })
}

const platformColorDecorationList: TextEditorDecorationType[] = []
function initDecorations(editor: TextEditor) {
  editor.setDecorations(UnderlineDecoration, [])
  if (platformColorDecorationList.length > 0) {
    platformColorDecorationList.forEach((item) => {
      item.dispose()
    })
  }
  platformColorDecorationList.length = 0
}

function platformColorDecoration(_value: string) {
  return window.createTextEditorDecorationType({
    color: _value,
    rangeBehavior: DecorationRangeBehavior.ClosedClosed,
  })
}
export function setPlatformColor(
  highlightRange: HighlightRange,
  editor: TextEditor,
) {
  const { prefix, platform, unPlatform } = highlightRange

  initDecorations(editor)

  for (const color in platform) {
    const decoration = createPlatformColorDecoration(color)
    platformColorDecorationList.push(decoration)

    editor.setDecorations(
      platformColorDecoration(color),
      prefix,
    )

    editor.setDecorations(
      decoration,
      platform[color],
    )
  }

  editor.setDecorations(
    UnderlineDecoration,
    unPlatform.map((item) => {
      const RightPlatform = findClosestPlatform(item.row)
      return {
        range: item.range,
        hoverMessage: new MarkdownString(`
### [@uni-helper](https://github.com/uni-helper/uni-highlight-vscode)\n
~~${item.row}~~ 不是一个有效的平台, 请检查拼写错误\n
是否要输入：\`${RightPlatform}\`
***
详情请查看[\`文档\`](https://uniapp.dcloud.net.cn/tutorial/platform.html#preprocessor)
`),
      }
    }),
  )
}
