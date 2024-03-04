import { Link } from "react-router-dom"
import { Button } from '@chakra-ui/react'
const HeroPage = () => {
  return (
    <section className="h-screen">


      <div className="relative flex justify-center items-center h-screen">

        <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
          <h1 className="text-2xl md:text-3xl lg:text-4xl mb-4 font-bold"  >Your Daily Expenses Tracker Software.</h1>
          <p className="text-md md:text-lg text-gray-400 mb-8" >Just sign in and Start using to know your finance.</p>
          <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center gap-4">
            <div> <Button colorScheme='purple'><Link to={"/login"}>Sign In</Link></Button></div>
            <div> <Button colorScheme='linkedin'><Link to={"/register"}>Register</Link></Button></div>
          </div>
        </div>



      </div>

    </section>

  )
}

export default HeroPage