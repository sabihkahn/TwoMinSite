import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import User from "../models/usermodel";

export const canaccesswebsite = async (
  req: Request, // No user ID or auth needed here
  res: Response,
  next: NextFunction,
) => {
  try {
    const { webname } = req.params;

    if (!webname) {
      return res.status(400).send({ message: "Website name parameter is missing" });
    }

    const userweb = await User.findOne(
      { "websitesbrands.shopname": webname },
      { "websitesbrands.$": 1 } // Only project the matched subdocument
    );

    if (!userweb || !userweb.websitesbrands.length) {
      return res.status(404).send({ message: "Website doesn't exist" });
    }

    const shop = userweb.websitesbrands[0];
    const subscriptionplan = shop.subscriptionplan;
    const datexp = shop.paymentdate;


    if (subscriptionplan !== "free") {
      if (!datexp) {
        return res.status(403).send({
          message: "can't access website subscription has ended please renew your subsucription",
        });
      }
    
      const paymentTime = new Date(datexp).getTime();
      const expirationLimit = 30 * 24 * 60 * 60 * 1000; // 30 days in ms
      const today = Date.now();
      
      if (today > (paymentTime + expirationLimit)) {
        return res.status(403).send({
            message: "can't access website subscription has ended please renew your subsucription",
        });
      }
    }
    
    next();
  } catch (error) {
    logger.error("Error in canaccess website middleware", error);
    res.status(500).send({ message: "Internal server error" });
  }
};