const Sequelize = require("sequelize");
const database = require("./database");

const Admin = database.define(
  "admins",
  {
    firstname: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    employeeid: {
      type: Sequelize.NUMBER
    },
    department: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    pincode: {
      type: Sequelize.NUMBER
    }
  },
  { timestamps: false }
);

Admin.verifyAdmin = async (req, res) => {
  const pinCode = req.params.pincode;
  const employeeId = req.params.employeeid;
  try {
    const admin = await Admin.findAll({
      where: {
        pincode: pinCode,
        employeeid: employeeId
      }
    });
    if (admin.length > 0) {
      return res.send(admin);
    } else {
      return res.send({ message: "No Admin" });
    }
  } catch (error) {
    return res.send(error);
  }
};

Admin.getAdmin = async (req, res) => {
  const name = req.params.name;
  try {
    const admin = await Admin.findAll({
      where: {
        firstname: name
      }
    });
    return res.send(admin);
  } catch (error) {
    return res.send(error);
  }
};

module.exports = Admin;
