import Schema from "../Schema.js";
import File, { FileSchemaNodeJson } from "./File.js";
import { EnumSchemaNodeJson } from "./Enum.js";
import { PrimitiveSchemaNodeJson } from "./Primitive.js";

const FILE_FIXTURE: FileSchemaNodeJson = {
  $id: "https://opencaptablecoalition.com/schema/files/TestFile.schema.json",
  title: "Test Title",
  description: "This is a test fixture exemplifying a File schema from OCF",
  type: "object",
  allOf: [
    {
      $ref: "https://opencaptablecoalition.com/schema/primitives/BaseFile.schema.json",
    },
  ],
  properties: { file_type: { const: "OCF_TEST_FILE" } },
  required: ["test_property1"],
};

const ENUM_OBJECT_TYPE_SCHEMA_NODE_FIXTURE: EnumSchemaNodeJson = {
  $id: "https://opencaptablecoalition.com/schema/enums/ObjectType.schema.json",
  title: "Enum - Object Type",
  description: "Enumeration of object types",
  type: "string",
  enum: ["VALUATION"],
};

const BASE_FILE_SCHEMA_NODE_FIXTURE: PrimitiveSchemaNodeJson = {
  $id: "https://opencaptablecoalition.com/schema/primitives/BaseFile.schema.json",
  title: "Object - BaseFile",
  description: "Abstract file to be extended by all other files",
  type: "object",
  properties: {},
  required: [],
};

const ENUM_SCHEMA_NODE_FIXTURE: EnumSchemaNodeJson = {
  $id: "https://opencaptablecoalition.com/schema/enums/TestEnum.schema.json",
  title: "Test Title",
  description: "This is a test fixture exemplifying an Enum schema from OCF",
  type: "string",
  enum: ["test_enum1"],
};

describe("File", () => {
  describe("#markdownOutput", () => {
    it("returns a string representing the node as Markdown", () => {
      const schema = new Schema([
        ENUM_OBJECT_TYPE_SCHEMA_NODE_FIXTURE,
        ENUM_SCHEMA_NODE_FIXTURE,
        BASE_FILE_SCHEMA_NODE_FIXTURE,
        FILE_FIXTURE,
      ]);
      const actual = new File(schema, FILE_FIXTURE).markdownOutput();

      expect(actual).toEqual(`:house: [Documentation Home](/README.md)

---

### Test Title

\`https://opencaptablecoalition.com/schema/files/TestFile.schema.json\`

**Description:** _This is a test fixture exemplifying a File schema from OCF_

**Data Type:** \`OCF_TEST_FILE\`

**Composed From:**

- [schema/primitives/BaseFile](/docs/schema/primitives/BaseFile.md)

**Properties:**

| Property  | Type                                                                                                       | Description       | Required |
| --------- | ---------------------------------------------------------------------------------------------------------- | ----------------- | -------- |
| file_type | **Constant:** \`OCF_TEST_FILE\`</br>_Defined in [schema/enums/ObjectType](/docs/schema/enums/ObjectType.md)_ | Object type field | -        |

**Source Code:** [schema/files/TestFile](/schema/files/TestFile.schema.json)

`);
    });
  });
});
