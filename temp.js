const { spawn } = require("child_process");
const py = spawn("python", ["py-script.py", "World"]);

py.stdout.on("data", (data) => {
  console.log(data.toString());
});

py.on("close", (code) => {
  console.log("Child process exited with code ", code);
});
