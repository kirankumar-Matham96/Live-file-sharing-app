import { userModel } from "./model.js";
import bcrypt from "bcryptjs";

class UserRepository {
  userSignUp = async (data) => {
    try {
      const user = await userModel(data);
      const userCreated = await user.save();

      return {
        id: userCreated._id,
        name: userCreated.name,
        email: userCreated.email,
        createdAt: userCreated.createdAt,
        updatedAt: userCreated.updatedAt,
      };
    } catch (error) {
      throw error;
    }
  };

  userSignIn = async ({ email, password }) => {
    try {
      const userFound = await userModel
        .findOne({ email: email })
        .select("+password");
      if (!userFound) {
        throw new Error("user not found");
      }

      const verify = bcrypt.compareSync(password, userFound.password);
      const user = userFound;
      return {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    } catch (error) {
      throw error;
    }
  };

  getUser = async (id) => {
    try {
      const user = await userModel.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  };

  updateUser = async (role, updatePayload, userIdToUpdate) => {
    try {
      if (role !== "admin") {
        throw new Error("Forbidden");
      }

      const user = await userModel.findById(userIdToUpdate);
      if (!user) {
        throw new Error("User not found");
      }

      const updatedUser = await userModel.findByIdAndUpdate(
        userIdToUpdate,
        updatePayload,
        { new: true }
      );
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };
}

export default new UserRepository();
