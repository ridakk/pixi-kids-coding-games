export default function fileName(filepath) {
  const arr = filepath.split('/');
  return arr[arr.length - 1].split('.')[0];
}
