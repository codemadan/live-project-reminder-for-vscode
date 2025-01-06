import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

let redBar: vscode.StatusBarItem | undefined;

export function activate(context: vscode.ExtensionContext) {
    // Register command to generate config file
    const generateConfigCommand = vscode.commands.registerCommand('redBar.generateConfig', generateConfigFile);
    context.subscriptions.push(generateConfigCommand);

    // Initial check for live project configuration
    updateRedBarVisibility();

    // Listen for active editor changes
    vscode.window.onDidChangeActiveTextEditor(() => {
        updateRedBarVisibility();
    });

    // Listen for changes in workspace folders
    vscode.workspace.onDidChangeWorkspaceFolders(() => {
        updateRedBarVisibility();
    });
}

function generateConfigFile() {
    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) {
        vscode.window.showErrorMessage('No active editor is open.');
        return;
    }

    const activeDocumentUri = activeEditor.document.uri;
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(activeDocumentUri);

    if (!workspaceFolder) {
        vscode.window.showErrorMessage('No workspace folder is associated with the active file.');
        return;
    }

    const configDirPath = path.join(workspaceFolder.uri.fsPath, '.vscode');
    const configFilePath = path.join(configDirPath, 'redbar.json');
    const defaultConfig = {
        showWarning: true,
        warningMessage: "⚠️ LIVE Environment Detected || Recommended to be cautious",
    };

    if (!fs.existsSync(configDirPath)) {
        fs.mkdirSync(configDirPath);
    }

    fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 4));
    vscode.window.showInformationMessage('Live project configuration file created at ' + configFilePath);
}

function updateRedBarVisibility() {
    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) {
        hideRedBar();
        return;
    }

    const activeDocumentUri = activeEditor.document.uri;
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(activeDocumentUri);

    if (!workspaceFolder) {
        hideRedBar();
        return;
    }

    const configFilePath = path.join(workspaceFolder.uri.fsPath, '.vscode', 'redbar.json');
    if (!fs.existsSync(configFilePath)) {
        hideRedBar();
        return;
    }

    const configContent = fs.readFileSync(configFilePath, 'utf-8');
    const config = JSON.parse(configContent);

    if (config.showWarning) {
        showRedBar(config.warningMessage);
    } else {
        hideRedBar();
    }
}

function showRedBar(message: string) {
    if (!redBar) {
        redBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1000);
    }
    redBar.text = message;
    redBar.tooltip = 'This is a live project environment warning.';
    redBar.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
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