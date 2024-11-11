const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    roles: [{ //an array with strings values
        type: String,
        default: "Employee"
    }],
    active: {
        type: Boolean,
        default: true
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
export default User;
