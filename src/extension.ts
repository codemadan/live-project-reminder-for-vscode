import * as vscode from 'vscode';

let redBar: vscode.StatusBarItem | undefined;
let decorationProvider: vscode.Disposable | undefined;

export function activate(context: vscode.ExtensionContext) {
    // Check if any folder in the workspace ends with "-LIVE"
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (workspaceFolders) {
        for (const folder of workspaceFolders) {
            if (folder.name.endsWith('-LIVE')) {
                showRedBar();
                break;
            }
        }
    }
}

function showRedBar() {
    // Create a status bar item
    redBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1000);
    redBar.text = '⚠️ LIVE Environment Detected || Can be a live project';
    redBar.tooltip = 'This folder name ends with "-LIVE". Be cautious!';
    redBar.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
    redBar.show();

    // Dispose the status bar item when the workspace changes
    vscode.workspace.onDidChangeWorkspaceFolders(() => {
        redBar?.dispose();
    });
}

export function deactivate() {
    if (redBar) {
        redBar.dispose();
    }
    if (decorationProvider) {
        decorationProvider.dispose();
    }
}
