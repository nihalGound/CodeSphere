import Loader from "@/components/Loader"

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Loader state>...loading</Loader>
    </div>
  )
}

export default Loading