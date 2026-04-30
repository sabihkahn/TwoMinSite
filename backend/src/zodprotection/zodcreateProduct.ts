import { z } from "zod";

export const ProductSchema = z.object({
  productname: z
    .string()
    .min(1, "Product name is required"),
  price: z
    .number()
    .min(1, "Product price is required"),

  quantity: z
    .number()
    .int()
    .min(0)
    .default(0),

  productdescription: z
    .string()
    .optional(),

  productmainphoto: z
    .string()
    .url("Must be a valid URL")
    .optional(),

  productextraphotos: z
    .array(
      z.object({
        imagesproduct: z.string().url("Must be a valid URL")
      })
    )
    .optional()
});


export type productinput = z.infer<typeof ProductSchema>;