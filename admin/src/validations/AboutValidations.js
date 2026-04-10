import { z } from "zod";
import { basic15CharText, basic3CharText, basic5CharText } from "./schema";

export const heroSectionValidation = z.object({
  title: basic3CharText,
  subText: basic5CharText,
});

export const pasterSectionValidation = z.object({
  pastorName: basic3CharText,
  title: basic3CharText,
  description: basic15CharText,
});

export const addPersonValidation = z.object({
  name: basic3CharText,
  designation: basic3CharText,
  description: basic15CharText,
});
