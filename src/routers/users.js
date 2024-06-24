import Express from "express";
import NotFoundError from "../errors/NotFoundError.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import auth from "../middleware/auth.js";

// Models
import createUser from "../models/users/createUser.js";
import deleteUser from "../models/users/deleteUser.js";
import getUserById from "../models/users/getUserById.js";
import getUsers from "../models/users/getUsers.js";
import updateUser from "../models/users/updateUser.js";

const router = Express.Router();

router.get("/", async (req, res) => {
  try {
    const { username, email } = req.query;

    const users = await getUsers(username, email);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Something went wrong while getting the list of users!");
  }
});


router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await getUserById(id);
      res.status(200).send(user);

    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", auth, async (req, res, next) => {
  try {
     const { username, password, name, email, phoneNumber, profilePicture } =
       req.body;
  
    if (
      !username ||
      !password ||
      !name ||
      !email ||
      !phoneNumber ||
      !profilePicture
    ) {
      return res.status(400).send("Missing required fields");
    }
    const newUser = await createUser(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while creating a new user!");
  }
});
    

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;

    const updatedUser = await updateUser(
      id,
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      console.error("Error in updateUser:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await deleteUser(id);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      console.error("Error in deleteUser:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});
    
export default router;



// !function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="494a7e94-0c2e-5e86-8a23-0cb86884b5a0")}catch(e){}}();
// //# debugId=494a7e94-0c2e-5e86-8a23-0cb86884b5a0

