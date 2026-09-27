import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Modal } from "@/components/Modal/Modal";
import { Select } from "@/components/Select/Select";
import { addToStopList } from "@/store/slices/menu.slice";
import { useDispatch } from "react-redux";
import styles from "./StopListModal.module.css";

type StopListModalProps = {
  item: MenuItem;
  onClose: () => void;
  isOpen: boolean;
};

const REASON_OPTIONS = [
  { value: "", label: "Выберите причину" },
  { value: "noProducts", label: "Закончились продукты" },
  { value: "badQuality", label: "Плохое качество партии" },
  { value: "noStock", label: "Нет повара на станции" },
  { value: "other", label: "«Другое»" },
];

export function StopListModal({ item, onClose, isOpen }: StopListModalProps) {
  const dispatch = useDispatch();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    dispatch(addToStopList(item));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.modal}>
      <h4 className={styles.modal__title}>Выберите причину</h4>
      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset className={styles.field}>
          <label htmlFor="reason">Причина *</label>
          <Select id="reason" required options={REASON_OPTIONS} />
        </fieldset>
        <fieldset className={styles.field}>
          <label htmlFor="comment">Комментарий</label>
          <textarea id="comment" className={styles.field__textarea} placeholder="Опишите причину" />
        </fieldset>
        <fieldset className={styles.field}>
          <label htmlFor="time">Время возврата *</label>
          <Input id="time" className={styles.field__time} required type="time" />
        </fieldset>
        <Button className={styles.button} type="submit">
          Добавить
        </Button>
      </form>
    </Modal>
  );
}
