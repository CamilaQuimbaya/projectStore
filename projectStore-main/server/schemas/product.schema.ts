import { z } from "zod";
// Esquema de Zod
export const zodProductSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(1000),
  stock: z.number().min(0),
  image: z.string().url(),
  price: z.number().min(0),
});

export type ProductType = z.infer<typeof zodProductSchema>;
