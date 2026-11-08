import { createRequire as __nodeCreateRequire } from "node:module";
__nodeCreateRequire(import.meta.url);
//#region electron/utils/window-messaging.ts
function sendToLiveWindow(window, channel, ...args) {
	try {
		if (window.isDestroyed()) return false;
		const contents = window.webContents;
		if (contents.isDestroyed() || contents.isCrashed() || contents.isLoadingMainFrame()) return false;
		const frame = contents.mainFrame;
		if (!frame || frame.isDestroyed()) return false;
		contents.send(channel, ...args);
		return true;
	} catch {
		return false;
	}
}
//#endregion
export { sendToLiveWindow as t };
