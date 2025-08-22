import express from "express";
import mongoose from "mongoose";
import Users from "./models/users.js";

const app = express();
app.use(express.json());

async function dbConnect () {
  try {
    await mongoose.connect('mongodb+srv://root:root@cluster0.twkujin.mongodb.net/practice')
    console.log('database connected')
  } catch (error) {
    console.log(error)
  }
}

dbConnect()

// query params body - req
app.post('/practice/:title/', async (req, res) => {
  try {
    const {username, email} = req.body;
    const {title} = req.params;
    const {color, minPrice, category} = req.query

    console.log("body ",username, email);

    console.log("params ",title)

    console.log("query ",color, minPrice, category)

    res.json({message: "data saved"})
  } catch (e) {
    console.log(e)
    res.status(500).json({message: "something went wrong"})
  }
})

// app.get('/users', async (req, res) => {
//   try {
//     const data = await Users.find().sort({email: 1}).skip(20).limit(10);

//     res.json({message: "users fetched", data: data})
//   } catch (e) {
//     console.log(e)
//     res.status(500).json({message: "something went wrong"})
//   }
// })

// app.get('/users/id', async (req, res) => {
//   const id = 123
//   try {
//     const data = await Users.findById(id);

//     res.json({message: "users fetched", data: data})
//   } catch (e) {
//     console.log(e)
//     res.status(500).json({message: "something went wrong"})
//   }
// })

// app.put('/users', async (req, res) => {
//   const id = 123
//   try {
//     const data = await Users.findByIdAndUpdate(id, {username: "hello world", });

//     res.json({message: "users fetched", data: data})
//   } catch (e) {
//     console.log(e)
//     res.status(500).json({message: "something went wrong"})
//   }
// })

// app.delete('/users', async (req, res) => {
//   const id = 123
//   try {
//     const data = await Users.findByIdAndDelete(id);

//     res.json({message: "users fetched", data: data})
//   } catch (e) {
//     console.log(e)
//     res.status(500).json({message: "something went wrong"})
//   }
// })

// app.post('/users', async (req, res) => {
//   try {
//     const {username, email, password} = req.body;

//     const isEmailExists = await Users.findOne({email: email});

//     if(isEmailExists){
//       return res.status(500).json({
//         message: "email already exists"
//       })
//     }

//     await Users.create({username, email, password})

//     res.json({message: "data saved"})
//   } catch (e) {
//     console.log(e)
//     res.status(500).json({message: "something went wrong"})
//   }
// })

app.listen(5000, () => {
  console.log("Server is Online now 🚀");
});

// Root Route
app.get("/", (req, res) => {
  res.send({ message: " API Working 🚀" });
});

// Create Account API
app.post("/login", (req, res) => {
  const { username, email, password, number } = req.body; 
  let errors = [];

  if (!username || !email || !password || !number) {
    return res.status(400).json({ message: "All fields (username, email, password, number) are required" });
  }

  if (!email.includes("@") || !email.includes("gmail.com")) {
    errors.push("Invalid email format");
  }

  if (password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  if (!/^\d+$/.test(number)) {
    errors.push("Number must contain only digits");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  res.json({ message: "Account created successfully!" });
});