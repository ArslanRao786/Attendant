const Sequelize = require("sequelize");
const database = require("./database");
const Op = Sequelize.Op;

const User = database.define(
  "users",
  {
    firstname: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    employeeid: {
      type: Sequelize.STRING
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
      type: Sequelize.STRING
    },
    officehours: {
      type: Sequelize.STRING
    },
    minimumworkinghours: {
      type: Sequelize.STRING
    }
  },
  { timestamps: false }
);

User.verifyUser = async (req, res) => {
  const pinCode = req.params.pincode;
  const employeeId = req.params.employeeid;
  try {
    const user = await User.findAll({
      where: {
        pincode: pinCode,
        employeeid: employeeId
      }
    });
    if (user.length > 0) {
      return res.send(user);
    } else {
      return res.send({ message: "No User" });
    }
  } catch (error) {
    return res.send(error);
  }
};

User.allUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.send(users);
  } catch (error) {
    return res.send(error);
  }
};

User.getUser = async (req, res) => {
  try {
    const user = await User.findAll({
      where: { firstname: `${req.params.name}` }
    });
    return res.send(user);
  } catch (error) {
    return res.send(error);
  }
};

User.createUser = async (req, res) => {
  const { firstname, lastname, role, department, email } = req.params;
  const id = `${department}-${Math.floor(Math.random() * 1000)}`;
  try {
    const user = await User.create({
      firstname: `${firstname}`,
      lastname: `${lastname}`,
      employeeid: `${id}`,
      department: `${department}`,
      role: `${role}`,
      status: "null",
      email: `${email}`,
      pincode: "0000"
    });
    return res.send(user);
  } catch (error) {
    return res.send(error);
  }
};

User.deleteUser = async (req, res) => {
  try {
    const user = await User.destroy({
      where: { id: req.params.id }
    });
    return res.send({ meassage: "User Deleted", id: req.params.id });
  } catch (error) {
    return res.send(error);
  }
};

User.updatePin = async (req, res) => {
  const { id, newpin } = req.params;
  try {
    const user = await User.update(
      {
        pincode: `${newpin}`
      },
      { where: { id: `${id}` } }
    );
    return res.send(user);
  } catch (error) {
    return res.send(error);
  }
};

User.updateUser = async (req, res) => {
  const { firstname, lastname, role, department, email, id } = req.params;
  try {
    const user = await User.update(
      {
        firstname: `${firstname}`,
        lastname: `${lastname}`,
        department: `${department}`,
        role: `${role}`,
        email: `${email}`
      },
      { where: { id: `${id}` } }
    );
    const updatedUser = await User.findAll({ where: { id: `${id}` } });
    return res.send(updatedUser);
  } catch (error) {
    return res.send(error);
  }
};

User.changeStatus = async (req, res) => {
  const { id, status } = req.params;
  try {
    const user = await User.update(
      {
        status: `${status}`
      },
      { where: { id: `${id}` } }
    );
    return res.send(user);
  } catch (error) {
    return res.send(error);
  }
};

User.changeOfficeTiming = async (req, res) => {
  const { start, end } = req.params;
  try {
    const user = await User.update(
      {
        officehours: `${start} am To ${end} pm`
      },
      { where: { id: { [Op.ne]: 0 } } }
    );
    return res.send(user);
  } catch (error) {
    return res.send(error);
  }
};

User.changeMinimumWorkingHours = async (req, res) => {
  const { time } = req.params;
  try {
    const user = await User.update(
      {
        minimumworkinghours: `${time} Hours`
      },
      { where: { id: { [Op.ne]: 0 } } }
    );
    return res.send(user);
  } catch (error) {
    return res.send(error);
  }
};

module.exports = User;
