import { formatPrice } from "@/utils/formatPrice";

type StopListCardProps = MenuItem;

export function StopListCard({ id, name, category, price, portionsLeft }: StopListCardProps) {
  return (
    <div>
      <h4>{name}</h4>
      <p>{category}</p>
      <p>{formatPrice(price)}</p>
      <p>Осталось: {portionsLeft}</p>
    </div>
  );
}
