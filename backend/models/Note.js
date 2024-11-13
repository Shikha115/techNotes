const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, //refer to user scehma
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

noteSchema.plugin(AutoIncrement, { // mongoose-sequence plugin
  inc_field: "ticket", //name of the field that will be incremented every time a new document is created
  id: "ticketNums", //The internal counter identifier
  start_seq: 500, //start value
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
