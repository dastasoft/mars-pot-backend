import "dotenv/config";

import createApp from "./lib/createApp";
import connectDB from "./lib/db";

const PORT = process.env.PORT || 3001;

connectDB(`${process.env.MONGO_URI}`)
  .then(() => {
    const app = createApp();
    app.listen(PORT);
    console.log(`Server running on http://localhost:${PORT}`);
  })
  .catch(err => console.log(err));
