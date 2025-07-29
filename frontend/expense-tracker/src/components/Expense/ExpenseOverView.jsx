import React, {useState, useEffect} from 'react'
import { LuPlus } from 'react-icons/lu'
import {  prepareExpenseLineChartData } from "../../utils/helper";
import CustomLineChart from '../Charts/CustomLineChart'

const ExpenseOverView  = ({transactions, onExpenseIncome}) => {
    const [chartData, setCharData] = useState([])
  
    useEffect(() => {
      const result =  prepareExpenseLineChartData(transactions)
      console.log("result of chart data", result)
    
      setCharData(result)
      
      return () => {}
    }, [transactions])
    
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your spending trends over the time and gain insights into where your money goes.
          </p>
        </div>

        <button className="add-btn" onClick={onExpenseIncome}>
          <LuPlus className="text-lg" />
          Add Expense
        </button>
      </div>

      <div className="mt-10">
        <CustomLineChart data={chartData}/>
      </div>
    </div>
  )
}

export default ExpenseOverView 