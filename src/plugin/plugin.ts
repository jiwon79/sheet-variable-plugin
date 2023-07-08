import { Fail, Result, Success } from "../common/model.ts";

figma.showUI(__html__, {width: 300, height: 200});

const load = async () => {
  const sheetUrl = await figma.clientStorage.getAsync(`${figma.currentPage.id}:sheetUrl`);
  const sheetName = await figma.clientStorage.getAsync(`${figma.currentPage.id}:sheetName`);
  const collectionName = await figma.clientStorage.getAsync(`${figma.currentPage.id}:collectionName`);
  console.log(sheetUrl, sheetName, collectionName)

  figma.ui.postMessage({type: 'load', sheetUrl, sheetName, collectionName});
}

load();

figma.ui.onmessage = msg => {
  console.log(msg.type)
  if (msg.type === 'run') {
    run(msg.sheetUrl, msg.sheetName, msg.collectionName)
  }
}

const searchCollectionByName = (collectionName: string): VariableCollection | null => {
  const localCollections: VariableCollection[] = figma.variables.getLocalVariableCollections();
  const collection = localCollections.find((collection) => collection.name === collectionName);

  return collection === undefined ? null : collection;
}

const getCollectionAndCreateIfNotExist = (collectionName: string): VariableCollection => {
  const collection = searchCollectionByName(collectionName);
  if (collection === null) {
    return figma.variables.createVariableCollection(collectionName);
  }

  return collection;
}

const run = async (sheetUrl: string, sheetName: string, collectionName: string) => {
  if (sheetUrl === "") {
    figma.notify("Please input sheet url");
    return;
  }
  if (sheetName === "") {
    figma.notify("Please input sheet name");
    return;
  }
  if (collectionName === "") {
    figma.notify("Please input collection name");
    return;
  }

  const collection = getCollectionAndCreateIfNotExist(collectionName);
  console.log(collection);

  const response = await fetchSheet(sheetUrl, sheetName);

  if (response.isFail) {
    figma.notify(response.message);
    return;
  }

  const data = response.data;
  if (data === null) {
    figma.notify("data is null");
    return;
  }

  await figma.clientStorage.setAsync(`${figma.currentPage.id}:sheetUrl`, sheetUrl);
  await figma.clientStorage.setAsync(`${figma.currentPage.id}:sheetName`, sheetName);
  await figma.clientStorage.setAsync(`${figma.currentPage.id}:collectionName`, collectionName);
}

const fetchSheet = async (sheetUrl: string, sheetName: string): Promise<Result<String[][]>> => {
  const baseUrl = "http://127.0.0.1:3000"
  const encodeSheetUrl = encodeURIComponent(sheetUrl)
  const encodeSheetName = encodeURIComponent(sheetName)
  const query = `?sheetUrl=${encodeSheetUrl}&sheetName=${encodeSheetName}`
  const url = `${baseUrl}/api/sheet${query}`

  const response = await fetch(url)
  const json = await response.json()

  switch (response.status) {
    case 200:
      return new Success(json.values)
    case 400:
      if (json.errorCode === 'URL_REQUIRED') {
        return new Fail(json.error, json.errorCode)
      }
      return new Fail(json.error, 'UNEXPECTED_ERROR')
    default:
      return new Fail(json.error, 'UNEXPECTED_ERROR')
  }
}
