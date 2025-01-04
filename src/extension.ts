import * as vscode from 'vscode';

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
    const redBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1000);
    redBar.text = '⚠️ LIVE Environment Detected';
    redBar.tooltip = 'This folder name ends with "-LIVE". Be cautious!';
    redBar.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
    redBar.show();

    // Dispose the status bar item when the workspace changes
    vscode.workspace.onDidChangeWorkspaceFolders(() => {
        redBar.dispose();
    });
}

export function deactivate() {
    // Cleanup if needed
}
