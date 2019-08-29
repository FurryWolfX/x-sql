const path = require("path");
const Builder = require("../dist/index").default;

Builder.setDialect("mssql");

const builder = new Builder({
  dir: path.resolve(__dirname, "./xml"),
  debug: true,
  debugCallback: log => {
    console.log(log);
  },
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

// const result2 = builder.build("test2", "getUser2",{});
// console.log(result2);

console.log(Builder.select("user", ["name", "age"], { id: 1, name: "wolfx" }));
console.log(Builder.insert("user", { id: 1, name: "wolfx" }));
console.log(Builder.update("user", { id: 1, name: "wolfx" }, { id: 2, name: "wolfx2" }));
console.log(Builder.delete("user", { id: 2, name: "wolfx2" }));
console.log(Builder.count("user"));
