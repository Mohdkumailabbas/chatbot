import app from "./app.js";
import { testConnection } from "./db/connection.js";
const PORT = process.env.PORT || 5000;
// Call the testConnection function during startup
testConnection().then(() => {
    app.listen(5000, () => {
        console.log("Server Started");
    });
}).catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map