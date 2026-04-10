import { z } from "zod";

export const basic3CharText = z
  .string()
  .min(3, { message: "Should be atleast 3 charecters long" });

export const basic5CharText = z
  .string()
  .min(5, { message: "Should be atleast 5 charecters long" });

export const basic15CharText = z
  .string()
  .min(15, { message: "Should be atleast 15 charecters long" });

export const basicUrl = z.string().url({ message: "Enter valid url" });

export const emaul = z.string().email({ message: "Enter a valid email" });
