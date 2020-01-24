require("dotenv").config();

const cors = require("cors");

const server = require("./server");

server.use(cors());

const PORT = process.env.PORT;

server.listen(PORT, () => console.log(`* Server listening on port ${PORT}`));
