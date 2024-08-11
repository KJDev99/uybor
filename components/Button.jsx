import Image from "next/image";

const Button = ({
  main,
  borderRadiusFull,
  color,
  image,
  text,
  width,
  height,
  mr,
}) => {
  return (
    <div
      className={`flex w-full h-full items-center justify-center cursor-pointer  ${
        main && `bg-main`
      } ${borderRadiusFull ? `rounded-full` : "rounded-[10px]"} ${
        color ? `text-${color}` : ""
      }`}
    >
      {image && (
        <Image
          src={image}
          alt="Logo"
          width={width ? width : ""}
          height={height ? height : ""}
          className={`mr-2 ${mr && "mr-0"}`}
        />
      )}
      {text && <span>{text}</span>}
    </div>
  );
};

export default Button;
