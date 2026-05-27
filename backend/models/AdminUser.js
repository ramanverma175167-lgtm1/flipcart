import mongoose from "mongoose";
import bcrypt from "bcrypt";

const adminUserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// HASH PASSWORD BEFORE SAVE
adminUserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model("AdminUser", adminUserSchema);