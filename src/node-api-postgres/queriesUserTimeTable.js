const Sequelize = require("sequelize");
const database = require("./database");

const Time = database.define(
  "userstimetables",
  {
    fk: {
      type: Sequelize.NUMBER
    },
    punchin: {
      type: Sequelize.NOW
    },
    punchout: {
      type: Sequelize.NOW
    }
  },
  { timestamps: false }
);

Time.addUserTime = async (req, res) => {
  const { id } = req.params;
  const punchin = new Date();
  try {
    const user = await Time.create({
      punchin: punchin,
      fk: `${id}`
    });
    return res.send(user);
  } catch (error) {
    return res.send(error);
  }
};

Time.addPunchOut = async (req, res) => {
  const { id } = req.params;
  const punchout = new Date();
  try {
    const user = await Time.update(
      {
        punchout: punchout
      },
      { where: { id: `${id}` } }
    );
    return res.send(user);
  } catch (error) {
    return res.send(error);
  }
};

Time.records = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Time.findAll({ where: { fk: `${id}` } });
    return res.send(user);
  } catch (error) {
    return res.send(error);
  }
};

Time.allRecords = async (req, res) => {
  try {
    const user = await Time.findAll();
    return res.send(user);
  } catch (error) {
    return res.send(error);
  }
};

module.exports = Time;
