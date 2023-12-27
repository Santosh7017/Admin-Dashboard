import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import OverallStat from "../models/OverallStat.js";


export const getuser = async (req, res) => {
      try {
        const {id} = req.params;
         const user = await User.findById(id);
       
         res.status(200).json(user);
         
      } catch (error) {
        res.status(404).json({message: error.message})
      }
}

export const getDashboardStatus = async (req, res) => {
  try {
  const currentMonth = "November";
  const currentYear = 2021;
  const currentDate = "2021-11-15";

 // recent transactions 
 const transactions = await Transaction.find().limit(50).sort({createdOn: -1});
     
 const overallStat = await OverallStat.find({year: currentYear});
 const {
  totalCustomers,
  yearlyTotalSoldUnits,
  yearlySalesTotal,
  monthlyData,
  salesByCategory
 } = overallStat[0];


  const thisMonthStats = overallStat[0].monthlyData.find(({month})=> {
    return month === currentMonth;
  });
  const todayStats = overallStat[0].dailyData.find(({date})=> {
    return date === currentDate;
  });

res.status(200).json({
  totalCustomers,
  yearlyTotalSoldUnits,
  yearlySalesTotal,
  salesByCategory, 
  monthlyData,
  thisMonthStats,
  todayStats,
  transactions
})
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}