import Express from "express";
import NotFoundError from "../errors/NotFoundError.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import auth from "../middleware/auth.js";

// Models
import createHost from "../models/hosts/createHost.js";
import deleteHost from "../models/hosts/deleteHost.js";
import getHostById from "../models/hosts/getHostById.js";
import getHosts from "../models/hosts/getHosts.js";
import updateHost from "../models/hosts/updateHost.js";

const router = Express.Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;

    const hosts = await getHosts(name);
    res.status(200).json(hosts);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Something went wrong while getting the list of hosts!");
  }
});


router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const host = await getHostById(id);

      res.status(200).json(host);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", auth, async (req, res) => {
  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;

    if (
      !username ||
      !password ||
      !name ||
      !email ||
      !phoneNumber ||
      !profilePicture ||
      !aboutMe
    ) {
      return res.status(400).send("Missing required fields");
    }
    const newHost = await createHost(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );
    res.status(201).json(newHost);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while creating a new host!");
  }
});

router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const {
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture,
    aboutMe,
  } = req.body;

  try {
    const updatedHost = await updateHost(
      id,
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );
    res.status(200).json(updatedHost);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      console.error("Error in updateHost:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});


router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const host = await deleteHost(id);

  if (host !== null) {
    res.status(200).json(host);
  } else {
    res.status(404).json({
      error: `Host with id ${id} not found.`,
    });
  }
});

export default router;

// !function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="b93904ad-ab13-5f14-9bf2-89cca7d001b3")}catch(e){}}();
// //# debugId=b93904ad-ab13-5f14-9bf2-89cca7d001b3
