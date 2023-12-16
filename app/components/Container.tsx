
interface ContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({children}) => {
  return (
    <div className="max-w-[2560px] xl:px-5 md:px-10 sm:px-2 px-4 overflow-hidden">
        {children}
    </div>
  )
}

export default Container