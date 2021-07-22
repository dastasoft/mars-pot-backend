import "dotenv/config";

import createApp from "./lib/createApp";

const PORT = process.env.PORT;
const app = createApp();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
