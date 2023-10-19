const { spawn } = require("child_process");
const { PythonShell } = require("python-shell");

const doPrediction = (category, subCategory, lowerRange, upperRange) => {
  let result = {
    1: { start: 100000000, end: 0 },
    2: { start: 100000000, end: 0 },
    3: { start: 100000000, end: 0 },
    4: { start: 100000000, end: 0 },
    5: { start: 100000000, end: 0 },
    6: { start: 100000000, end: 0 },
    7: { start: 100000000, end: 0 },
    8: { start: 100000000, end: 0 },
    9: { start: 100000000, end: 0 },
    10: { start: 100000000, end: 0 },
    11: { start: 100000000, end: 0 },
    12: { start: 100000000, end: 0 },
  };
  for (
    let sale = parseInt(lowerRange);
    sale <= parseInt(upperRange);
    sale += 100
  ) {
    let options = {
      mode: "text",
      scriptPath: "C:\\Users\\yashd\\OneDrive\\Desktop\\Ava-Launch\\server",
      args: ["py-script.py", category, sale, subCategory],
    };
    PythonShell.run("py-script.py", options).then((messages) => {
      // results is an array consisting of messages collected during execution
      // console.log("results: ", messages);
      let month = Math.floor(parseInt(messages[0]));
      const prevStart = result[month].start;
      const prevEnd = result[month].end;
      result[month].start = Math.min(prevStart, sale);
      result[month].end = Math.max(prevEnd, sale);
    });
  }
  return result;
};

const helper = (category, subCategory, sale) => {
  let py = spawn("python", ["py-script.py", category, sale, subCategory]);
  let month;
  py.stdout.on("data", (data) => {
    // console.log(data.toString());
    month = Math.floor(parseInt(data.toString()));
    console.log("Inside : ", month);
    return month;
    // const prevStart = 99999999999;
    // const prevEnd = 0;
    // result[month].start = Math.min(prevStart, sale);
    // result[month].end = Math.max(prevEnd, sale);
    // console.log(result[month]);
  });
  py.on("exit", (code) => {
    return month;
    // console.log("Child process exited with code ", code);
  });
  return month;
};

module.exports = doPrediction;
