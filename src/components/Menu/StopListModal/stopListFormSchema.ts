import { REASONS } from "@/constants/menu";
import { z } from "zod";

const COMMENT_MAX_LENGTH = 200;
const COMMENT_MIN_LENGTH = 10;

function hasEnoughComment(values: { reason: StopListEntry["reason"]; comment: string }) {
  return values.reason !== "other" || values.comment.length >= COMMENT_MIN_LENGTH;
}

export const stopListFormSchema = z
  .object({
    reason: z.string().pipe(z.enum(REASONS, { error: "Выберите причину" })),
    comment: z.string().trim().max(COMMENT_MAX_LENGTH, "Комментарий — максимум 200 символов"),
    returnAt: z.string().min(1, "Укажите время возврата"),
  })
  .refine(hasEnoughComment, {
    path: ["comment"],
    message: `Для причины «Другое» опишите ситуацию — минимум ${COMMENT_MIN_LENGTH} символов`,
  });

export type StopListFormInput = z.input<typeof stopListFormSchema>;
export type StopListFormValues = z.infer<typeof stopListFormSchema>;
