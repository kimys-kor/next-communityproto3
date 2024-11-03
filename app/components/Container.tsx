interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[1300px] px-2 mx-auto flex gap-5 relative">
      {children}
    </div>
  );
};

export default Container;
