const inputSheetUrl = document.getElementById('input-sheetUrl');
const inputSheetName = document.getElementById('input-sheetName');
const inputCollectionName = document.getElementById('input-collectionName');
const button = document.querySelector('.button-run');

if (inputSheetUrl == null || inputSheetName == null || inputCollectionName == null || button == null) {
  throw new Error('element not found');
}

if (!(inputSheetName instanceof HTMLInputElement) || !(inputSheetUrl instanceof HTMLInputElement) || !(inputCollectionName instanceof HTMLInputElement) || !(button instanceof HTMLButtonElement)) {
  throw new Error('element is not HTMLInputElement');
}

inputSheetName.onchange = (event) => {
  if (!(event.target instanceof HTMLInputElement)) return;

  inputSheetName.value = event.target.value;
}

inputSheetUrl.onchange = (event) => {
  if (!(event.target instanceof HTMLInputElement)) return;

  inputSheetUrl.value = event.target.value;
}


inputCollectionName.onchange = (event) => {
  if (!(event.target instanceof HTMLInputElement)) return;

  inputCollectionName.value = event.target.value;
}


button.addEventListener('click', () => {
  const sheetUrl = inputSheetUrl.value;
  const sheetName = inputSheetName.value;
  const collectionName = inputCollectionName.value;

  if (sheetUrl && sheetName) {
    parent.postMessage({pluginMessage: {type: 'run', sheetUrl, sheetName, collectionName}}, '*');
  }
});
