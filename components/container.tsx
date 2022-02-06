import Header from './header'

interface ContainerProps {
  children: React.ReactNode
}

function Container({ children }: ContainerProps) {
  return (
    <>
      <div className="container max-w-3xl m-auto px-2 mb-10">
        <Header />
      </div>
      <div className="container max-w-2xl m-auto px-4">
        <div>{children}</div>
      </div>
    </>
  )
}

export default Container
