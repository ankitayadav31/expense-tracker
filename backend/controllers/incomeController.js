const xlsx = require("xlsx");
const Income = require("../models/Income");
const jwt = require("jsonwebtoken");

// //Generate jwt token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
// };

//add income source
exports.addIncome = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    //validation: check for missing fields
    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fileds are required." });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();
    return res.status(200).json({
      result: newIncome,
      //token: generateToken(newIncome._id)
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//get all income source
exports.getAllIncome = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//delete income source
exports.deleteIncome = async (req, res, next) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.json({ message: "income deleted sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//download excel
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    //prepare data for Excel
    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0],
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, "income_details.xlsx");
    res.download("income_details.xlsx");
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
