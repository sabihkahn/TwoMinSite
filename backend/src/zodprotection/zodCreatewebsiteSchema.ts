import { z } from "zod";

export const CreateWebsiteSchema = z.object({
  theme: z.string().min(1).default("default"),

  shopname: z.string().min(2, "Shop name is required"),
  shopdescription: z.string().min(5, "Description is required"),

  shoplogo: z.string().url("Valid logo URL is required"),
  shopemail: z.string().email("Valid email is required"),

  shoplinks: z.array(
    z.object({
      link: z.string().url("Valid link is required")
    })
  ),

  shopadress: z.string().min(3, "Address is required"),

  phone: z.string().min(7).max(15),
  city: z.string().min(2),
  country: z.string().min(2),

  mapLocation: z.string().min(3, "Map location is required"), // not restricted to Google Maps

  shophomepageimg: z.string().url("Valid homepage image URL is required")
});

export type Createwebsiteinput = z.infer<typeof CreateWebsiteSchema>;