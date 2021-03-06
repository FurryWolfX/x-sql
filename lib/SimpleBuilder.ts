import * as SqlString from "sqlstring";
import * as TSqlString from "tsqlstring";

type KeyValue<T> = {
  [key: string]: T;
};

let dialect: string = "none";

class SimpleBuilder {
  public static MYSQL: string = "mysql";
  public static MSSQL: string = "mssql";
  public static NONE: string = "none";
  public static setDialect(value: string): void {
    dialect = value;
  }
  /**
   * 方言
   */
  public static escapeId(value: string): string {
    if (dialect === SimpleBuilder.MYSQL) {
      return SqlString.escapeId(value);
    } else if (dialect === SimpleBuilder.MSSQL) {
      return TSqlString.escapeId(value);
    } else {
      return value;
    }
  }
  /**
   * @param table 表名
   * @param cols 列名
   * @param whereObject 查询条件
   * @param op 条件操作符，默认 and
   * @param orderBy 排序 xxx asc desc
   * @param limit 数量限制
   */
  public static select(table: string, cols: string[], whereObject: KeyValue<string | number>, op: string = "AND", orderBy?: string, limit?: number[]): string {
    const whereKeys = Object.keys(whereObject || {});
    const sql = ["SELECT", cols.join(", "), "FROM", SimpleBuilder.escapeId(table)];
    const params: Array<string | number> = [];
    const where: string[] = [];
    if (whereKeys.length > 0) {
      sql.push("WHERE");
      whereKeys.forEach(key => {
        where.push(`${SimpleBuilder.escapeId(key)} = ?`);
        params.push(whereObject[key]);
      });
    }
    sql.push(where.join(` ${op} `));
    if (orderBy) {
      sql.push(`ORDER BY ${orderBy}`);
    }
    if (limit) {
      if (dialect === "mysql") {
        sql.push(`LIMIT ${limit.join(",")}`);
      } else if (dialect === "mssql" && limit.length === 2) {
        sql.push(`OFFSET ${limit[0] / limit[1]} ROWS FETCH NEXT ${limit[1]} ROWS ONLY`);
      }
    }
    return SqlString.format(sql.join(" ") + ";", params);
  }

  /**
   * @param table 表名
   * @param whereObject 查询条件
   * @param op 条件操作符，默认 and
   */
  public static count(table: string, whereObject: KeyValue<string | number>, op: string = "AND"): string {
    const whereKeys = Object.keys(whereObject || {});
    const sql = ["SELECT COUNT(*) AS count", "FROM", SimpleBuilder.escapeId(table)];
    const params: Array<string | number> = [];
    const where: string[] = [];
    if (whereKeys.length > 0) {
      sql.push("where");
      whereKeys.forEach(key => {
        where.push(`${SimpleBuilder.escapeId(key)} = ?`);
        params.push(whereObject[key]);
      });
    }
    sql.push(where.join(` ${op} `));
    return SqlString.format(sql.join(" ") + ";", params);
  }

  /**
   * @param table 表名
   * @param data 需要插入的数据，根据键名自动填充到相应的字段
   */
  public static insert(table: string, data:  KeyValue<string | number>): string {
    const keys = Object.keys(data || {});
    const params: Array<string | number> = [];
    const cols: string[] = [];
    const values: string[] = [];
    keys.forEach(key => {
      cols.push(SimpleBuilder.escapeId(key));
      params.push(data[key]);
      values.push("?");
    });
    const sql = ["INSERT INTO", SimpleBuilder.escapeId(table), "("];
    sql.push(cols.join(", "));
    sql.push(") VALUES (");
    sql.push(values.join(", "));
    sql.push(")");
    return SqlString.format(sql.join(" ") + ";", params);
  }

  /**
   *
   * @param table 表名
   * @param data 需要更新的数据，根据键名自动填充到相应的字段
   * @param whereObject 查询条件
   * @param op 条件操作符，默认 and
   */
  public static update(table: string, data: KeyValue<string | number>, whereObject: KeyValue<string | number>, op: string = "AND"): string {
    const dataKeys = Object.keys(data || {});
    const whereKeys = Object.keys(whereObject || {});
    const values: string[] = [];
    const where: string[] = [];
    const params: Array<string | number> = [];
    dataKeys.forEach(key => {
      values.push(`${SimpleBuilder.escapeId(key)} = ?`);
      params.push(data[key]);
    });
    whereKeys.forEach(key => {
      where.push(`${SimpleBuilder.escapeId(key)} = ?`);
      params.push(whereObject[key]);
    });
    const sql = ["UPDATE", SimpleBuilder.escapeId(table), "SET"];
    sql.push(values.join(", "));
    if (whereKeys.length > 0) {
      sql.push("WHERE");
      sql.push(where.join(` ${op} `));
    }
    return SqlString.format(sql.join(" ") + ";", params);
  }

  /**
   * @param table 表名
   * @param whereObject 查询条件
   * @param op 条件操作符，默认 and
   */
  public static delete(table: string, whereObject: KeyValue<string | number>, op: string = "AND"): string {
    const whereKeys = Object.keys(whereObject || {});
    const where: string[] = [];
    const params: Array<string | number> = [];
    whereKeys.forEach(key => {
      where.push(`${SimpleBuilder.escapeId(key)} = ?`);
      params.push(whereObject[key]);
    });
    const sql = ["DELETE FROM", SimpleBuilder.escapeId(table)];
    if (whereKeys.length > 0) {
      sql.push("WHERE");
      sql.push(where.join(` ${op} `));
    }
    return SqlString.format(sql.join(" ") + ";", params);
  }
}

export default SimpleBuilder;
