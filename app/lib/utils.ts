//write me a function with take a file and return his size  in human readable format (KB, MB, gb)
export function formatFileSize(size: number): string {
  if (size < 1024) {
    return size + " bytes";
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + " KB";
  } else if (size < 1024 * 1024 * 1024) {
    return (size / (1024 * 1024)).toFixed(2) + " MB";
  } else {
    return (size / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  }
}
