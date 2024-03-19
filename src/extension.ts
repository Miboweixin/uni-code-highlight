// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import type { ExtensionContext } from 'vscode';
import { commands, languages, window, workspace } from 'vscode';
import { Ranges } from './getVscodeRange';
import { CommentFoldingRangeProvider } from './CommentFoldingRangeProvider';
import { foldOtherPlatformComment } from './foldOtherPlatformComment';
import { patterns } from './constants';


function setupEventListeners() {
	window.onDidChangeActiveTextEditor(() => new Ranges());
	workspace.onDidChangeTextDocument(() => new Ranges());
}
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
	new Ranges();
	setupEventListeners();

	context.subscriptions.push(
		languages.registerFoldingRangeProvider(
			patterns,
			new CommentFoldingRangeProvider(),
		),
		commands.registerCommand('uni.comment.reload', () => {
			new Ranges();
		}),
		commands.registerCommand('uni.comment.fold-other-platform', () => {
			foldOtherPlatformComment();
		}),
	);
}

// This method is called when your extension is deactivated
export function deactivate() { }
