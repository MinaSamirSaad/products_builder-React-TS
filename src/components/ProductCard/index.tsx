import { IProduct } from "../../interfaces";
import { textSlicer } from "../../utils/functions";
import Image from "../Image";
import Button from "../UI/Button";
interface IProps {
  product: IProduct
}
const ProductCard = ({ product }: IProps) => {
  const { title, description, imageURL, category, price } = product;
  return (
    <div className="mx-w-sm md:max-w-lg mx-auto md:mx-0 border rounded p-2 flex flex-col">
      <Image imageUrl={imageURL} alt="car photo" className="rounded-md" />
      <h3>{title}</h3>
      <p>{textSlicer(description, 50)}</p>
      <div className="flex items-center my-4 space-x-1">
        <span className="w-5 h-5 bg-amber-800 rounded-full cursor-pointer"></span>
        <span className="w-5 h-5 bg-indigo-600 rounded-full cursor-pointer"></span>
        <span className="w-5 h-5 bg-orange-400 rounded-full cursor-pointer"></span>
        <span className="w-5 h-5 bg-green-500 rounded-full cursor-pointer"></span>
      </div>
      <div className=" flex justify-between items-center">
        <span className="">${price}</span>
        <Image imageUrl={category.imageURL} alt={category.name} className="w-10 h-10 rounded-full object-cover" />
      </div>

      <div className="flex items-center justify-between space-x-1 my-5 text-white ">
        <Button className="bg-indigo-700">Edit</Button>
        <Button className="bg-red-700">Delete</Button>
      </div>
    </div>
  )
}
export default ProductCard;