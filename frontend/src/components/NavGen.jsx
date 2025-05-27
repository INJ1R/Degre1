import { forwardRef } from "react";

export const NavGen = forwardRef(({ icon, name }, ref) => {
  const handleClick = () => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div
      onClick={handleClick}
      className="bg-white w-32 h-24 text-center rounded-xl border-[1px] hover:cursor-pointer"
    >
      <img src={icon} alt="#" className="mx-auto mt-4 h-10 " />
      <p className="font-bold">{name}</p>
    </div>
  );
});

NavGen.displayName = "NavGen";
