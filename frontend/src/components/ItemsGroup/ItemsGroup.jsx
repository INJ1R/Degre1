import { forwardRef } from "react";
import { Product } from "../product/Product";

export const ItemsGroup = forwardRef(({ items, title }, ref) => {
  return (
    <div ref={ref}>
      <h1 className="pb-6 text-3xl font-bold font-dosis">{title}</h1>
      <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {items.map((el) => (
          <Product {...el} />
        ))}
      </div>
    </div>
  );
});

ItemsGroup.displayName = "ItemsGroup";
