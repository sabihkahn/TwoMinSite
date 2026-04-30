import { Request, Response } from "express";
import logger from "../utils/logger";
import { CreateWebsiteSchema } from "../zodprotection/zodCreatewebsiteSchema";
import Usermodel from "../models/usermodel";
import mongoose from "mongoose";
import { generateShopHtml } from '../utils/website/websiteshowed'
import { ProductSchema } from '../zodprotection/zodcreateProduct'


interface Requestwithid extends Request {
  id?: any;
}

export const CreateWebsite = async (req: Requestwithid, res: Response) => {
  try {
    const id = req.id?.id


    if (!id) {
      return res.status(401).send({ message: "Unauthorized: id not provided" });
    }

    const validationresult = CreateWebsiteSchema.safeParse(req.body);

    if (!validationresult.success) {
      return res
        .status(400)
        .send({ message: validationresult.error.flatten().fieldErrors });
    }

    const shopname = validationresult.data.shopname
      ?.toLowerCase()
      .replace(/\s+/g, ' ');

    if (!/^[a-z]+$/.test(shopname)) {
      return res.status(400).send({ message: "Invalid shopname it just contain alphabets" });
    }


    const websiteData = validationresult.data;

    const checkifnameexist = await Usermodel.findOne({
      "websitesbrands.shopname": validationresult.data.shopname
    });
    if (checkifnameexist) {
      return res.status(400).send({ message: "brand name already exist tryanother" })
    }

    const updatedUser = await Usermodel.findByIdAndUpdate(
      id,
      {
        $push: { websitesbrands: websiteData }
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(201).send({
      message: "Website created successfully",

    });

  } catch (error) {
    logger.error("Error in createWebsite controller", error);
    return res.status(500).send({ message: "Internal server error" });
  }
};


export const getwebsite = async (req: Requestwithid, res: Response) => {
  try {
    const { webname } = req.params;

    const userweb = await Usermodel.findOne(
      { "websitesbrands.shopname": webname },
      { "websitesbrands.$": 1 }
    ).select("-myoders")

    if (!userweb || !userweb.websitesbrands.length) {
      return res.status(400).send({ message: "Website doesn't exist" });
    }

    // Pass the brand object specifically to the generator
    const brandData = userweb.websitesbrands[0];
    const htmlData = generateShopHtml(brandData);

    if (!htmlData) {
      return res.status(400).send({ message: "website inappropriate theme" })
    }


    // Send the actual HTML string
    res.setHeader('Content-Type', 'text/html');
    return res.send(htmlData);

  } catch (error) {
    logger.error("Error in gettingwebsite controller", error);
    return res.status(500).send({ message: "Internal server error" });
  }
}

export const addProduct = async (req: Requestwithid, res: Response) => {
  try {

    const id = req.id?.id;
    let { productdata, webname, webid } = req.body;

    const validationres = ProductSchema.safeParse(productdata)

    if (!validationres.success) {
      return res.status(400).send({ message: validationres.error.flatten().fieldErrors })
    }

    const user = await Usermodel.findOneAndUpdate(
      {
        _id: id,
        "websitesbrands._id": webid
      },
      {
        $push: {
          "websitesbrands.$.shopProducts": productdata
        }
      },
      { new: true }
    );


    if (!user) {
      return res.status(404).send({ message: "Shop not found" });
    }


    res.status(200).send({ message: "product created successfully" })


  } catch (error) {

    logger.error(" an error occur in addproduct in weebsitebuild controller ", error)
    res.status(500).send({ message: "internal server error " })

  }
}

export const addreview = async (req: Requestwithid, res: Response) => {
  try {

    const { review, productId } = req.body

    if (!review) {
      res.status(400).send({ message: "review is not provided" })
    }

    const user = await Usermodel.findOneAndUpdate(
      {
        "websitesbrands.shopProducts._id": productId
      },
      {
        $push: {
          "websitesbrands.$[].shopProducts.$[product].reviews": review
        }
      },
      {
        arrayFilters: [
          { "product._id": productId }
        ],
        returnDocument: "after"
      }
    );
    res.status(200).send({ message: "review added successfully" })
  } catch (error) {
    logger.error("an error occur in addreview controller ===> ", error)
    res.status(500).send({ message: "Internal server error" })
  }
}

export const purchaseproduct = async (req: Requestwithid, res: Response) => {
  try {
    const { name, phoneno, location, email, productId, webid } = req.body;

    // basic validation
    if (!name || !phoneno || !location || !email || !productId || !webid) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const order = {
      name,
      phoneno,
      location,
      email,
      productid: productId
    };

    const user = await Usermodel.findOneAndUpdate(
      {
        "websitesbrands._id": webid
      },
      {
        $push: {
          "websitesbrands.$.myoders": order
        }
      },
      {
        returnDocument: "after"
      }
    );

    if (!user) {
      return res.status(404).send({ message: "Shop not found" });
    }

    res.status(200).send({
      message: "Product purchased successfully, we will contact you soon"
    });

  } catch (error) {
    logger.error("error in purchaseproduct ===> ", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const deleteproduct = async (req: Requestwithid, res: Response) => {
  try {
    const userId = req.id?.id; // from auth middleware
    const { shopname, productid } = req.params;

    if (!userId || !shopname || !productid) {
      return res.status(400).send({ message: "Required data missing" });
    }

    const user = await Usermodel.findOneAndUpdate(
      {
        _id: userId,
        "websitesbrands.shopname": shopname
      },
      {
        $pull: {
          "websitesbrands.$.shopProducts": { _id: productid }
        }
      },
      { returnDocument: "after" }
    );

    if (!user) {
      return res.status(404).send({ message: "Shop or product not found" });
    }

    res.status(200).send({ message: "Product deleted successfully" });

  } catch (error) {
    logger.error("deleteproduct error --> ", error);
    res.status(500).send({ message: "Internal server error" });
  }
};


export const updateproduct = async (req: Requestwithid, res: Response) => {
  try {
    const userId = req.id?.id; // from auth
    const { shopid, productid } = req.params;
    const { productdata } = req.body;

    if (!userId || !shopid || !productid || !productdata) {
      return res.status(400).send({ message: "Missing required data" });
    }

    const user = await Usermodel.findOneAndUpdate(
      {
        _id: userId,
        "websitesbrands._id": shopid,
        "websitesbrands.shopProducts._id": productid
      },
      {
        $set: {
          "websitesbrands.$[shop].shopProducts.$[product].productname": productdata.productname,
          "websitesbrands.$[shop].shopProducts.$[product].quantity": productdata.quantity,
          "websitesbrands.$[shop].shopProducts.$[product].productdescription": productdata.productdescription,
          "websitesbrands.$[shop].shopProducts.$[product].productmainphoto": productdata.productmainphoto,
          "websitesbrands.$[shop].shopProducts.$[product].productextraphotos": productdata.productextraphotos
        }
      },
      {
        arrayFilters: [
          { "shop._id": shopid },
          { "product._id": productid }
        ],
        returnDocument: "after"
      }
    );

    if (!user) {
      return res.status(404).send({ message: "Product or shop not found" });
    }

    res.status(200).send({ message: "Product updated successfully" });

  } catch (error) {
    logger.error("updateproduct error --> ", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const deletewebsite = async (req: Requestwithid, res: Response) => {
  try {

    const id = req.id?.id
    const { webname } = req.params

    if (!webname) {
      return res.status(400).send({ message: "webname is required" })
    }

    const userdata = await Usermodel.findByIdAndUpdate(
      id,
      {
        $pull: {
          websitesbrands: {
            shopname: webname
          }
        }
      },
      { new: true }
    )

    if (!userdata) {
      res.status(400).send({ message: " no website found " })
    }

    res.status(200).send({ message: "website deleted successfully" })


  } catch (error) {
    logger.error(" an error occur while deleting website ==> ", error)
    res.status(500).send({ message: "Internal server error" })
  }
}

export const updatewebsite = async (req: Requestwithid, res: Response) => {
  try {

    const id = req.id?.id
    const { webname } = req.params

    const {
      shopname,
      shopdescription,
      shoplogo,
      shopemail,
      shoplinks,
      shopadress,
      phone,
      city,
      country,
      mapLocation,
      shophomepageimg
    } = req.body


    const userdata = await Usermodel.findOneAndUpdate(
      {
        _id: id,
        "websitesbrands.shopname": webname

      },
      {
        $set: {
          "websitesbrands.$.shopdescription": shopdescription,
          "websitesbrands.$.shoplogo": shoplogo,
          "websitesbrands.$.shopemail": shopemail,
          "websitesbrands.$.shoplinks": shoplinks,
          "websitesbrands.$.shopadress": shopadress,
          "websitesbrands.$.phone": phone,
          "websitesbrands.$.city": city,
          "websitesbrands.$.country": country,
          "websitesbrands.$.mapLocation": mapLocation,
          "websitesbrands.$.shophomepageimg": shophomepageimg
        }
      },
      { returnDocument: 'after' }
    )

    if (!userdata) {
      res.status(400).send({ message: " no website found " })
    }

    res.status(200).send({ message: "updated successfully" })



  } catch (error) {
    logger.error("an error occur in updatewebsite controller ==> ", error)
    res.status(500).send({ message: "internal server error" })
  }
}

export const updateTheme = async (req: Requestwithid, res: Response) => {
  try {

    const id = req.id?.id
    const { webname, newtheme } = req.body

    const themes = [
      "default",
      "forest",
      "dark",
      "greenwoods",
      "softglass",
      "neonfuture",
      "darkblue",
      "gothic"
    ]

    if (!themes.includes(newtheme)) {
      return res.status(400).send({ message: "invalid theme" })
    }

    const updateuserweb = await Usermodel.findOneAndUpdate(
      {
        _id: id,
        "websitesbrands.shopname": webname
      },
      {
        "websitesbrands.$.theme": newtheme

      }
    )

    res.status(200).send({ message: "theme updated successfully" })
  } catch (error) {
    logger.info("an error occur in update theme controller ====> ", error)
    res.status(500).send({ message: "internal server error" })
  }

}


export const getproductsandorders = async (req: Requestwithid, res: Response) => {
  try {
    const { webname } = req.params; 
    const id = req.id?.id;

    const userdata = await Usermodel.findById(
      id,
      {
        websitesbrands: { $elemMatch: { shopname: webname } }
      }
    );

    if (!userdata || !userdata.websitesbrands?.length) {
      return res.status(404).send({ message: "Shop not found", products: [] });
    }

    const productsarray = userdata.websitesbrands[0].shopProducts;
     const ordersdata = userdata?.websitesbrands[0].myoders

    res.status(200).send({
      message: "product fetched successfully",
      products: productsarray,
      orders:ordersdata
    });

  } catch (error) {
    logger.error("an error occur in getproduct controller ==> ", error);
    res.status(500).send({ message: "internal server error" });
  }
};


// export const getOrders = async (req: Requestwithid, res: Response) => {
//   try {
//     const { webname } = req.params;
//     const id = req.id?.id;
    

//     const userdata = await Usermodel.findById(
//       id,
//       {
//         websitesbrands: { $elemMatch: { shopname: webname } }
//       }
//     );

//     const ordersdata = userdata?.websitesbrands[0].myoders

//     res.status(200).send({message:"get order successfully",ordersdata})

//   } catch (error) {
//     logger.error("an error occur in getOrders controller ", error)
//     res.status(500).send({ message: "interenal server error" })
//   }
// }