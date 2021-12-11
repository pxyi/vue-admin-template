type TDownload = (filePath: string, fileName?: string) => Promise<void>;


const download: TDownload = (filePath, fileName) => new Promise(async(resolve, reject) => {
  const res = await fetch(filePath);
  const blob = await res.blob();
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onload = e => {
		$.element('a', { attrs: { download: fileName || `${Date.now()}`, href: e.target.result as string } }).click()
		resolve();
	};
	reader.onerror = () => reject();
})
export default download;