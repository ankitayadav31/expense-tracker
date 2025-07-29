const Expense = require("../models/Expense");
const jwt = require("jsonwebtoken");
const xlsx = require("xlsx");

//Generate jwt token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

//add expense source
exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date } = req.body;

    //validation: check for missing fields
    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    return res.status(200).json({ 
        result: newExpense,
        token: generateToken(userId)
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//get all expense source
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server Error" , error: error.message});
  }
};

//delete expense source
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "expense deleted sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//download excel
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    
    //prepare data for Excel
    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0],
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    xlsx.writeFile(wb, "expense_details.xlsx");
    console.log("excel file written")
    res.download("expense_details.xlsx");
  } catch (error) {
    console.error("Failed to write Excel file:", error);
    res.status(500).json({ message: "Server Error"});
  }
};
