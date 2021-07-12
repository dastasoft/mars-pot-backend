import createApp from "./lib/createApp";
import connectDB from "./lib/db";

const PORT = 3000;

connectDB()
  .then(() => {
    const app = createApp();
    app.listen(PORT);
    console.log(`Server running on http://localhost:${PORT}`);
  })
  .catch(err => console.log(err));
