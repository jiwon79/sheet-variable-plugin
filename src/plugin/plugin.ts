import { Fail, Result, Success } from "../common/model.ts";

figma.showUI(__html__, {width: 300, height: 200});

figma.ui.onmessage = msg => {
  console.log(msg.type)
  if (msg.type === 'run') {
    run(msg.sheetUrl, msg.sheetName, msg.collectionName)
  }
}

const run = async (sheetUrl: string, sheetName: string, collectionName: string) => {
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

  console.log(collectionName);
  console.log(data);
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
