const path = require("path");
const Builder = require("../lib/index");

const builder = new Builder({
  dir: path.resolve(__dirname, "./xml"),
  debug: true,
  debugCallback: log => {
    console.log(log);
  }
});

const result = builder.build("test", "getUser", {
  flag: 1,
  name: "wolfx",
  idList: [
    {
      id: 3,
    },
    {
      id: 5,
    },
  ],
});
console.log(result);

const result2 = builder.build("test2", "getUser2",{});
console.log(result2);
