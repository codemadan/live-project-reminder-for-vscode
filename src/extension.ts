import * as vscode from 'vscode';

let redBar: vscode.StatusBarItem | undefined;

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

    // Listen for active editor changes
    vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor) {
            const filePath = editor.document.uri.fsPath;
            if (isLiveProjectFile(filePath)) {
                showRedBar();
            } else {
                hideRedBar();
            }
        }
    });

    // Listen for file selection changes in the explorer
    vscode.window.onDidChangeVisibleTextEditors(editors => {
        editors.forEach(editor => {
            const filePath = editor.document.uri.fsPath;
            if (isLiveProjectFile(filePath)) {
                showRedBar();
            } else {
                hideRedBar();
            }
        });
    });
}

function isLiveProjectFile(filePath: string): boolean {
    // Implement logic to determine if the file is part of the live project
    // This could involve checking the file path against known project directories
    return filePath.includes('-LIVE'); // Example logic
}

function showRedBar() {
    if (!redBar) {
        // Create a status bar item
        redBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1000);
        redBar.text = '⚠️ LIVE Environment Detected || Can be a live project';
        redBar.tooltip = 'This folder name ends with "-LIVE". Be cautious!';
        redBar.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
    }
    redBar.show();
}

function hideRedBar() {
    if (redBar) {
        redBar.hide();
    }
}

export function deactivate() {
    if (redBar) {
        redBar.dispose();
    }
}
