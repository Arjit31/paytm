const { Router } = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const {User, Account} = require("../db");
const {authMiddleware} = require("../middleware");
const router = Router();

function validateUser(data) {
    const schema = zod.object({
        username: zod.string().min(3).max(30),
        password: zod.string().min(6),
        firstName: zod.string().max(50),
        lastName: zod.string().max(50),
    });
    return schema.safeParse(data);
}

router.post('/signup', async (req, res) => {
    const data = req.body;
    const { success, error } = validateUser(data);
    if (!success) {
        res.status(400).send(error);
        return;
    }

    const existingUser = await User.findOne({ username: data.username });
    if (existingUser) {
        res.status(400).json("User already exists");
        return;
    }
    let user;
    try {
        user = await User.create(data);
        await Account.create({ userId: user._id, balance: 1 + Math.random() * 10000 });

    } catch (error) {
        res.status(400).json(error);
    }
    const userId = user._id;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
    res.json({ message: "User created successfully", token: token });
});

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        res.status(400).json("User does not exist");
        return;
    }
    if (user.password !== password) {
        res.status(400).json("Invalid password");
        return;
    }
    const userId = user._id;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
    res.json({ message: "User signed in successfully", token: token });
});

const userUpdateSchema = zod.object({
    username: zod.string().optional(),
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});

router.put('/', authMiddleware, async (req, res) => {
    const data = req.body;
    const { success, error } = userUpdateSchema.safeParse(data);
    if (!success) {
        res.status(400).json(error);
        return;
    }
    const userId = req.userId;
    try {
        await User.updateOne({ _id: userId }, data);
    } catch (error) {
        res.status(400).json(error);
        return;
    }
    res.json({ message: "User updated successfully" });
});

router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{ firstName: { $regex: filter, $options: 'i' } }, { lastName: { $regex: filter, $options: 'i' } }]
    });
    res.json({user: users.map(user =>
        ({username: user.username, firstName: user.firstName, lastName: user.lastName, _id: user._id})
    )});
});

module.exports = router;