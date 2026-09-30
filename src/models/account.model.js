const { default: mongoose } = require("mongoose");

const require = mongoose("mongoose");

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Account must be associated with the user"],
      index:true,
    },
    status: {
      enum: {
        values: ["ACTIVE", "FROZEN", "CLOSED"],
        message: "Status can be either ACTIVE, FROZEN OR CLOSED",
        default:"ACTIVE"
      },
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      default: "INR",
    },
  },
  { timestamps: true },
);

accountSchema.index({user:1,status:1})

const accountModel = mongoose.model("account",accountSchema)

module.exports = accountModel
