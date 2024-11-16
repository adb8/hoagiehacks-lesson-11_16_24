import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/User.model.mjs";
import { Post } from "./models/Post.model.mjs";

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || "your_mongodb_connection_string";
const DB_NAME = "mongoose-demo";

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, { dbName: DB_NAME, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB\n"))
  .catch((err) => console.error("Could not connect to MongoDB", err, "\n"));

async function main() {
  mongoose.connection.dropDatabase(); // Clear all data (for demo purposes)

  // Create a user
  const user1Data = {
    name: "Alice",
    email: "alice@example.com",
    age: 22,
    type: "user",
  };
  const user1 = new User(user1Data);
  const result1 = await user1.save();
  console.log("User created:", result1, "\n");

  // Create another user
  const user2Data = {
    name: "Bob",
    email: "bob@example.com",
    age: 30,
    type: "user",
  };
  const user2 = new User(user2Data);
  const result2 = await user2.save();
  console.log("User created:", result2, "\n");

  // Get all user documents in user collection
  const users = await User.find();
  console.log("Users:", users, "\n");

  // Delete the first user document
  // if (users.length > 0) {
  //   const deleteUserResult = await User.findByIdAndDelete(users[0]._id);
  //   console.log("User deleted:", deleteUserResult, "\n");
  // }

  // Create a post
  const post1Data = {
    sender: user2._id,
    post: "Hello, this is Bob's first post!",
  };
  const post1 = new Post(post1Data);
  const result3 = await post1.save();
  console.log("Post created:", result3, "\n");

  // Create another post
  const post2Data = {
    sender: user2._id,
    post: "Hello, this is Bob's second post!",
  };
  const post2 = new Post(post2Data);
  const result4 = await post2.save();
  console.log("Post created:", result4, "\n");

  // Get all post documents in post collection
  const posts = await Post.find();
  console.log("Posts:", posts, "\n");

  // Delete the first post document
  // if (posts.length > 0) {
  //   const deletePostResult = await Post.findByIdAndDelete(posts[0]._id);
  //   console.log("Post deleted:", deletePostResult, "\n");
  // }

  // Close the connection
  mongoose.connection.close();
}

// Run the main function
main().catch((err) => console.error(err));
