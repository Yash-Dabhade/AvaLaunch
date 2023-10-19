const { spawn } = require("child_process");
const { PythonShell } = require("python-shell");

const doPrediction = async (category, subCategory, lowerRange, upperRange) => {
  let result = {
    1: { start: -1, end: -1 },
    2: { start: -1, end: -1 },
    3: { start: -1, end: -1 },
    4: { start: -1, end: -1 },
    5: { start: -1, end: -1 },
    6: { start: -1, end: -1 },
    7: { start: -1, end: -1 },
    8: { start: -1, end: -1 },
    9: { start: -1, end: -1 },
    10: { start: -1, end: -1 },
    11: { start: -1, end: -1 },
    12: { start: -1, end: -1 },
  };
  async function nested(resolveOfAnotherPromise) {
    for (
      let sale = parseInt(lowerRange);
      sale <= parseInt(upperRange);
      sale += 200
    ) {
      let options = {
        mode: "text",
        scriptPath: "C:\\Users\\yashd\\OneDrive\\Desktop\\Ava-Launch\\server",
        args: ["py-script.py", category, sale, subCategory],
      };
      PythonShell.run("py-script.py", options).then((messages) => {
        let month = Math.floor(parseInt(messages[0]));

        if (result[month].start != -1)
          result[month].start = Math.min(result[month].start, sale);
        else result[month].start = sale;

        if (result[month].end != -1)
          result[month].end = Math.max(result[month].end, sale);
        else result[month].end = sale;

        if (sale + 100 >= upperRange) resolveOfAnotherPromise(0);
      });
    }
  }
  await new Promise((resolve, reject) => nested(resolve));
  return result;
};

module.exports = doPrediction;
