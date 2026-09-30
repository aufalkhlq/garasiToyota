import { getActiveCars } from "@/lib/cms";
import PriceTableClient from "./PriceTableClient";

export default async function PriceTable() {
  const cars = await getActiveCars();
  return <PriceTableClient cars={cars} />;
}
