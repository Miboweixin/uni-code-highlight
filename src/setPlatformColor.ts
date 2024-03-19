import type { TextEditor, TextEditorDecorationType } from 'vscode';
import { DecorationRangeBehavior, window } from 'vscode';
import type { HighlightRange } from './transformPlatform';
import { HIGHTLIGHT_COLOR } from './constants';
import { findClosestPlatform } from './utils/findClosestPlatform';

const UnderlineDecoration = window.createTextEditorDecorationType({
  textDecoration: 'none; border-bottom: 1px dashed currentColor',
  cursor: 'pointer',
  rangeBehavior: DecorationRangeBehavior.ClosedClosed,
});

const prefixColorDecoration = window.createTextEditorDecorationType({
  color: HIGHTLIGHT_COLOR.prefix,
  rangeBehavior: DecorationRangeBehavior.ClosedClosed,
});

function createPlatformColorDecoration(color: string) {
  return window.createTextEditorDecorationType({
    color,
    rangeBehavior: DecorationRangeBehavior.ClosedClosed,
    backgroundColor: `${color}3C`,
  });
}

const platformColorDecorationList: TextEditorDecorationType[] = [];
function initDecorations(editor: TextEditor) {
  editor.setDecorations(UnderlineDecoration, []);
  if (platformColorDecorationList.length > 0) {
    platformColorDecorationList.forEach((item) => {
      item.dispose();
    });
  }
  platformColorDecorationList.length = 0;
  editor.setDecorations(prefixColorDecoration, []);
}

export function setPlatformColor(
  highlightRange: HighlightRange,
  editor: TextEditor,
) {
  const { prefix, platform, unPlatform } = highlightRange;

  initDecorations(editor);

  editor.setDecorations(
    prefixColorDecoration,
    prefix,
  );

  for (const color in platform) {
    const decoration = createPlatformColorDecoration(color);
    platformColorDecorationList.push(decoration);
    editor.setDecorations(
      decoration,
      platform[color],
    );
  }

  editor.setDecorations(
    UnderlineDecoration,
    unPlatform.map((item) => {
      const RightPlatform = findClosestPlatform(item.row);
      return {
        range: item.range,
      };
    }),
  );
}
