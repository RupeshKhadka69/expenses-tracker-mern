import { Link } from "react-router-dom"

const HeroPage = () => {
  return (
    <div>
        <h3 className="m-10 text-center text-4xl"> This is Home Page</h3>
        <Link to={'/income'}>income</Link>
    </div>
  )
}

export default HeroPage