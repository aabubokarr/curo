function Button(props) {
  return (
    <button
      type="submit"
      className="mt-2 w-full h-[48px] bg-[#009BA9] flex items-center justify-center text-[16px] text-white font-bold rounded-lg"
    >
      {props.name}
    </button>
  );
}
export default Button;
