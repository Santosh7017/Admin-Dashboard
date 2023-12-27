import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import getCountryIso3 from "country-iso-2-to-3";
export const getProducts = async (req, res) => {
  // * basic method to fetch the product with their stats
  //  try {
  //   const products = await Product.find();
  //         console.log(products);
  //    const ProductsWithStats = await Promise.all(
  //     products.map(async (product) => {
  //             const stat = await ProductStat.find({
  //                 productId: product._id
  //             })
  //             return {
  //                 ...product._doc,
  //                 stat
  //                }
  //     })
  //    )
  // res.status(200).json(ProductsWithStats);

  // } catch (error) {
  //   res.status(404).json({message: error.message})
  // }


  //* optimized method to fetch the product with their stats and process the data  using aggregation framework
  try {
    const ProductsWithStats = await Product.aggregate([
      {
        $lookup: {
          from: 'productstats',
          localField: '_id',
          foreignField: 'productId',
          as: 'stats',
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          description: 1,
          category: 1,
          rating: 1,
          supply: 1,
          createdAt: 1,
          updatedAt: 1,
          stats: {
            $ifNull: ['$stats', []],
          },
        },
      },
    ]);

    res.status(200).json(ProductsWithStats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const  getCustomers = async (req, res) => {
     try {
      const customers = await User.find({role: "user"}).select("-password");
      res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({message: error.message})
  }
};



export const getTransactions = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    console.log(req.query);
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    const mappedLocations = users.reduce((acc, {country }) => {
      const countryISO3 = getCountryIso3(country);
      if(!acc[countryISO3]){
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return {id: country, value: count}
      }
    )
    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}