const { object } = require("./utils")
const Resource = require("./utils/Resource")

const baseRow = {
  _id: "ro_ta_5b1649e42a5b41dea4ef7742a36a7a70_e6dc7e38cf1343b2b56760265201cda4",
  type: "row",
  tableId: "ta_5b1649e42a5b41dea4ef7742a36a7a70",
  name: "Mike",
  age: 30,
}

const inputRow = {
  ...baseRow,
  relationship: ["ro_ta_..."],
}

const row = {
  ...baseRow,
  relationship: [
    {
      primaryDisplay: "Joe",
      _id: "ro_ta_...",
    },
  ],
}

const enrichedRow = {
  _id: "ro_ta_5b1649e42a5b41dea4ef7742a36a7a70_e6dc7e38cf1343b2b56760265201cda4",
  name: "eg",
  tableId: "ta_5b1649e42a5b41dea4ef7742a36a7a70",
  type: "row",
  relationship: [
    {
      _id: "ro_ta_users_us_8f3d717147d74d759d8cef5b6712062f",
      name: "Joe",
      tableId: "ta_users",
      internal: [
        {
          _id: "ro_ta_5b1649e42a5b41dea4ef7742a36a7a70_e6dc7e38cf1343b2b56760265201cda4",
          primaryDisplay: "eg",
        },
      ],
    },
  ],
}

const rowSchema = {
  description: "The row to be created/updated, based on the table schema.",
  type: "object",
  properties: {
    _id: {
      description: "The ID of the row.",
      type: "string",
    },
    tableId: {
      description: "The ID of the table this row comes from.",
      type: "string",
    },
  },
  additionalProperties: {
    oneOf: [
      { type: "string" },
      { type: "object" },
      { type: "integer" },
      { type: "array" },
      { type: "boolean" },
    ],
  },
}

module.exports = new Resource()
  .setExamples({
    inputRow: {
      value: inputRow,
    },
    row: {
      value: {
        row: row,
      },
    },
    enrichedRow: {
      value: {
        row: enrichedRow,
      },
    },
    rows: {
      value: {
        rows: [row],
        hasNextPage: true,
        bookmark: 10,
      },
    },
  })
  .setSchemas({
    row: rowSchema,
    rowOutput: object({
      row: rowSchema,
    }),
  })
