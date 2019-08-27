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

# 简易API

```typescript
interface SimpleBuilder {
  select(table: string, cols: string[], whereObject: any, op: string = "AND", orderBy?: string, limit?: number[]): string;
  count(table: string, whereObject: any, op: string = "AND"): string;
  insert(table: string, data: any): string;
  update(table: string, data: any, whereObject: any, op: string = "AND"): string;
  delete(table: string, whereObject: any, op: string = "AND"): string;
}
```

```javascript
console.log(Builder.select("user", ["name", "age"], { id: 1, name: "wolfx" }));
console.log(Builder.count("user", {}));
console.log(Builder.insert("user", { id: 1, name: "wolfx" }));
console.log(Builder.update("user", { id: 1, name: "wolfx" }, { id: 2, name: "wolfx2" }));
console.log(Builder.delete("user", { id: 2, name: "wolfx2" }));
```
