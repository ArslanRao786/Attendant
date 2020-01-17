const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const admin = require("./queriesAdmin");
const userTimeTable = require("./queriesUserTimeTable");
const user = require("./queriesUser");
const port = 4000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

//AdminRequests
app.get("/admin/:pincode/:employeeid", admin.verifyAdmin);
app.get("/get-admin/:name", admin.getAdmin);
app.get("/all-users", user.allUsers);
app.get("/user/:pincode/:employeeid", user.verifyUser);
app.post(
  "/add-user/:firstname/:lastname/:role/:department/:email",
  user.createUser
);
app.put(
  "/update-user/:firstname/:lastname/:role/:department/:email/:id",
  user.updateUser
);
app.put("/change-office-timing/:start/:end", user.changeOfficeTiming);
app.put("/change-minimum-working-hours/:time", user.changeMinimumWorkingHours);
app.delete("/delete-user/:id", user.deleteUser);

//UserRequests
app.get("/previous-records/:id", userTimeTable.records);
app.get("/single-user/:name", user.getUser);
app.get("/all-users-records", userTimeTable.allRecords);
app.post("/add-user-punch-in-time/:id", userTimeTable.addUserTime);
app.put("/add-user-punch-out-time/:id", userTimeTable.addPunchOut);
app.put("/update-pin/:id/:newpin", user.updatePin);
app.put("/change-status/:id/:status", user.changeStatus);

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
