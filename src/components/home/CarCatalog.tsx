import { getActiveCars, getActiveCarTypes } from "@/lib/cms";
import CarCatalogView from "./CarCatalogView";

export default async function CarCatalog() {
  const [cars, types] = await Promise.all([getActiveCars(), getActiveCarTypes()]);
  return <CarCatalogView cars={cars} types={types} />;
}

