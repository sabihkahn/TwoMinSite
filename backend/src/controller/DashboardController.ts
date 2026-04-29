import { Request, Response } from "express";
import logger from "../utils/logger";
import Usermodel from "../models/usermodel";
import mongoose from "mongoose";

interface Requestwithid extends Request {
    id?: any;
}

interface webdata {
    shopname: string;
    shoplogo: string;
    shopid: any;

}

interface IBrand {
    _id: any;
    shopname: string;
    shoplogo: string;

}

export const Dashboardallweb = async (req: Requestwithid, res: Response) => {
    try {
        const id = req.id?.id
        if (!id) {
            return res.status(400).send({ message: "id is not provided" })
        }

        const userdata = await Usermodel.findById(id)

        let lenght = userdata?.websitesbrands.length
        let websites = userdata?.websitesbrands.map((e: any) => { return { shopname: e.shopname, shoplogo: e.shoplogo, shopid: e._id } })
        if (!userdata) {
            return res.status(400).send({ message: "user  not found can't load data" })
        }

        res.status(200).send({
            message: "dashboard data fetched ", userdata: {
                totalwebsites: lenght,
                websites
            }
        })

    } catch (error) {
        logger.error("an error occur in dashboard controller ===> ", error)
        res.status(500).send({ message: " internal server error " })
    }
}

export const getWebsiteanalytics = async (req: Requestwithid, res: Response) => {
    try {
        const id = req.id?.id
        const { webname, webid } = req.body

        if (!id) {
            return res.status(400).send({ message: "id is not provided" })
        }


        const userweb = await Usermodel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $project: {
                    targetWeb: {
                        $filter: {
                            input: "$websitesbrands",
                            as: "item",
                            cond: { $eq: ["$$item.shopname", webname] }
                        }
                    }
                }
            },
            {
                $unwind: "$targetWeb"
            },
            {
                $project: {
                    shopName: "$targetWeb.shopname",
                    totalProducts: { $size: { $ifNull: ["$targetWeb.shopProducts", []] } },
                    totalOrders: { $size: { $ifNull: ["$targetWeb.myoders", []] } },
                    totallinks: { $size: { $ifNull: ["$targetWeb.shoplinks", []] } },
                    totalStockQuantity: {
                        $sum: "$targetWeb.shopProducts.quantity"
                    }
                }
            }
        ])

        res.status(200).send({ message: "analytics get successfully ", analytics: userweb[0] })

    } catch (error) {
        logger.error("an error occur in getwebsite analytics controller ===>", error)
        res.status(500).send({ message: "Internal server error" })
    }
}


export const searchWebsite = async (req: Requestwithid, res: Response) => {
  try {
    const id = req.id?.id;
    let { webname } = req.query;

    const searchString = webname?.toString() || "";

    if (!searchString) {
      return res.status(400).send({ message: "web name is not provided" });
    }

    const result = await Usermodel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) }
      },
      {
        $project: {
          websitesbrands: {
            $filter: {
              input: "$websitesbrands",
              as: "item",
              cond: {
                $regexMatch: {
                  input: "$$item.shopname",
                  regex: searchString,
                  options: "i"
                }
              }
            }
          }
        }
      }
    ]);

    const websites = result[0]?.websitesbrands?.map((e: any) => ({
      shopname: e.shopname,
      shoplogo: e.shoplogo,
      shopid: e._id
    })) || [];

    res.status(200).send({
      message: "Search successful",
      websites
    });

  } catch (error) {
    logger.error("Error in searchWebsite controller ==> ", error);
    res.status(500).send({ message: "Internal server error" });
  }
};