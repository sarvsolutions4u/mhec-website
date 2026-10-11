import { deliveryLabels, type Delivery } from "@/lib/programs";

const styles: Record<Delivery, string> = {
  online: "bg-sky/20 text-sky-deep",
  partner: "bg-ink text-white",
  blended: "bg-mist text-ink ring-1 ring-sky/50",
  onsite: "bg-white text-ink ring-1 ring-ink/25",
  othm: "bg-sky text-ink",
};

const dots: Record<Delivery, string> = {
  online: "bg-sky-deep",
  partner: "bg-sky",
  blended: "bg-sky-deep",
  onsite: "bg-ink",
  othm: "bg-ink",
};

export default function DeliveryBadge({ delivery }: { delivery: Delivery }) {
  return (
    <span className={`badge ${styles[delivery]}`} title={deliveryLabels[delivery].detail}>
      <span className={`h-1.5 w-1.5 rounded-full ${dots[delivery]}`} aria-hidden="true" />
      {deliveryLabels[delivery].label}
    </span>
  );
}
