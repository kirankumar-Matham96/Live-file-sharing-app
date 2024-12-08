import userRepository from "./repository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

class UserController {
  signup = async (req, res, next) => {
    try {
      const { name, email, password, role } = req.body;

      const userData = {
        name,
        email,
        password: bcrypt.hashSync(password, 12),
        role,
      };

      const user = await userRepository.userSignUp(userData);
      res.status(200).json({ success: true, message: "user registered", user });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  signin = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await userRepository.userSignIn({ email, password });
      const token = jwt.sign(
        {
          useId: user.userId,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1 day" }
      );

      res.status(200).json({ success: true, message: "user loggedin", token });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  getUserById = async (req, res, next) => {
    try {
      const { userId } = req;
      const { id } = req.params;
      // check if the user is admin?

      const user = await userRepository.getUser(id);
      res.status(200).json({ succes: true, user });
    } catch (error) {
      next(error);
    }
  };

  updateUserById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { role } = req;
      const data = req.body;

      const updatedUser = await userRepository.updateUser(role, data, id);

      res
        .status(200)
        .json({ success: true, message: "user updated", user: updatedUser });
    } catch (error) {
      next(error);
    }
  };
}

export default new UserController();
