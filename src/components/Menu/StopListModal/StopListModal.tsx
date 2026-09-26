import { Button } from "@/components/Button/Button";
import { Modal } from "@/components/Modal/Modal";
import { addToStopList } from "@/store/slices/menu.slice";
import { useDispatch } from "react-redux";

type StopListModalProps = {
  item: MenuItem;
  onClose: () => void;
  isOpen: boolean;
};

export function StopListModal({ item, onClose, isOpen }: StopListModalProps) {
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addToStopList(item));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Название" />
        <input type="text" placeholder="Описание" />
        <input type="time" placeholder="Время" />
        <Button type="submit">Добавить</Button>
      </form>
    </Modal>
  );
}
