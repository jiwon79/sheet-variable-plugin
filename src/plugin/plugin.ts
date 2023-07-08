figma.showUI(__html__, {width: 300, height: 200});

figma.ui.onmessage = msg => {
  console.log(msg.type)
  if (msg.type === 'run') {
    console.log("run")
    console.log(msg)
  }
}
