import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Modal } from "@/components/Modal/Modal";
import { Select } from "@/components/Select/Select";
import { REASON_OPTIONS } from "@/constants/menu";
import { useAppDispatch } from "@/store";
import { addToStopList } from "@/store/slices/menu.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import styles from "./StopListModal.module.css";
import {
  stopListFormSchema,
  type StopListFormInput,
  type StopListFormValues,
} from "./stopListFormSchema";

type StopListModalProps = {
  item: MenuItem;
  onClose: () => void;
  isOpen: boolean;
};

const REASON_SELECT_OPTIONS = [{ value: "", label: "Выберите причину" }, ...REASON_OPTIONS];

export function StopListModal({ item, onClose, isOpen }: StopListModalProps) {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StopListFormInput, unknown, StopListFormValues>({
    resolver: zodResolver(stopListFormSchema),
    defaultValues: { reason: "", comment: "", returnAt: "" },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = handleSubmit((values) => {
    dispatch(
      addToStopList({
        ...item,
        itemId: item.id,
        ...values,
        createdAt: new Date().toISOString(),
      }),
    );
    handleClose();
  });

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className={styles.modal}>
      <h4 className={styles.modal__title}>Выберите причину</h4>
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <fieldset className={styles.field}>
          <label htmlFor="reason">Причина *</label>
          <Select
            id="reason"
            className={styles.field__select}
            options={REASON_SELECT_OPTIONS}
            aria-invalid={Boolean(errors.reason)}
            {...register("reason")}
          />
          {errors.reason && (
            <p className={styles.error} role="alert">
              {errors.reason.message}
            </p>
          )}
        </fieldset>
        <fieldset className={styles.field}>
          <label htmlFor="comment">Комментарий</label>
          <textarea
            id="comment"
            className={styles.field__textarea}
            placeholder="Опишите причину"
            aria-invalid={Boolean(errors.comment)}
            {...register("comment")}
          />
          {errors.comment && (
            <p className={styles.error} role="alert">
              {errors.comment.message}
            </p>
          )}
        </fieldset>
        <fieldset className={styles.field}>
          <label htmlFor="time">Время возврата *</label>
          <Input
            id="time"
            type="time"
            className={styles.field__time}
            aria-invalid={Boolean(errors.returnAt)}
            {...register("returnAt")}
          />
          {errors.returnAt && (
            <p className={styles.error} role="alert">
              {errors.returnAt.message}
            </p>
          )}
        </fieldset>
        <Button className={styles.button} type="submit">
          Добавить
        </Button>
      </form>
    </Modal>
  );
}
