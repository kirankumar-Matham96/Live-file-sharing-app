import { body, validationResult } from "express-validator";

class UserValidations {
  signUpValidation = async (req, res, next) => {
    try {
      await body("name")
        .isLength({ min: 3 })
        .withMessage(
          "name is required and it should contain min of 3 characters"
        )
        .run(req);

      await body("email")
        .notEmpty()
        .isEmail()
        .withMessage("email is required and should be valid")
        .run(req);

      await body("password")
        .isLength({ min: 8 })
        .withMessage("password is required and should have min of 8 characters")
        .run(req);

      const validationsResults = validationResult(req);
      if (!validationsResults.isEmpty()) {
        res
          .status(400)
          .json({ success: false, error: validationsResults.array()[0].msg });
      }

      next();
    } catch (error) {
      next(error);
    }
  };

  signInValidation = async (req, res, next) => {
    try {
      await body("email")
        .notEmpty()
        .isEmail()
        .withMessage("email is required and should be valid")
        .run(req);

      await body("password")
        .isLength({ min: 8 })
        .withMessage("password is required and should have min of 8 characters")
        .run(req);

      const validationsResults = validationResult(req);
      if (!validationsResults.isEmpty()) {
        res
          .status(400)
          .json({ success: false, error: validationsResults.array()[0].msg });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

export const userValidations = new UserValidations();
