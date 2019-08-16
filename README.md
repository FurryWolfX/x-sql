# example

**待优化** `for` 里面不能再嵌套其他标签。

```xml
<root namespace="test">
    <query name="getUser">
        select * from user where 1=1
        <if condition="@flag === 1">
            and name = @name
            and id in (
            <for separator="," array="idList">
                @id
            </for>
            )
        </if>
    </query>
</root>
```

```javascript
const path = require("path");
const Builder = require("@wolfx/x-sql").default;

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
```
