figma.showUI(__html__, {width: 300, height: 200});

figma.ui.onmessage = msg => {
  console.log(msg.type)
  if (msg.type === 'run') {
    run(msg.sheetUrl, msg.sheetName, msg.collectionName)
  }
}

const run = async (sheetUrl: string, sheetName: string, collectionName: string) => {
  await fetchSheet(sheetUrl, sheetName);
  console.log(collectionName);
  console.log("run");
}

const fetchSheet = async (sheetUrl: string, sheetName: string) => {
  const baseUrl = "http://127.0.0.1:3000"
  const encodeSheetUrl = encodeURIComponent(sheetUrl)
  const encodeSheetName = encodeURIComponent(sheetName)
  const query = `?sheetUrl=${encodeSheetUrl}&sheetName=${encodeSheetName}`
  const url = `${baseUrl}/api/sheet${query}`

  const response = await fetch(url)
  const json = await response.json()
  console.log(json)
}
