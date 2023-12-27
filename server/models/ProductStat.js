import mongoose from "mongoose";

const ProductStatSchema = new mongoose.Schema(
    {
       productId: {
        
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
       yearlySalesTotal: {
        type: Number,
        required: true
    },
    yearlyTotalSoldUnits: {
        type: Number,
        required: true
    },
    monthlyData: [
        {
            month: String,
            totalSales: Number,
            totalUnits: Number,
            
        }
       ],
       dailyData : [
        {
            date: String,
            totalSales: Number,
            totalUnits: Number,
    }
],
    },
   
    {timestamps: true}
);
const ProductStat = mongoose.model("ProductStat", ProductStatSchema);
export default ProductStat;