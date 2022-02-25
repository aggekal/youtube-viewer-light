const Spinner = (): JSX.Element => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-8 w-8"></div>
    </div>
  );
};
export default Spinner;
