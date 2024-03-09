import { FormEvent, useState } from 'react'
import ProductCard from './components/ProductCard'
import Modal from './components/UI/Modal';
import { productList, formInputsList, colors, categories } from './data'
import Button from './components/UI/Button';
import Input from './components/UI/Input';
import { IProduct } from './interfaces';
import { productValidation } from './Validation';
import ErrorMessage from './components/UI/ErrorMessage';
import CircleColor from './components/UI/CircleColor';
import { v4 as uuid } from "uuid";
import SelectMenu from './components/UI/SelectMenu';

function App() {
  const defaultProduct: IProduct = {
    title: '',
    description: '',
    imageURL: '',
    price: '',
    colors: [],
    category: {
      name: '',
      imageURL: ''
    }
  }
  const defaultErrors = {
    title: '',
    description: '',
    imageURL: '',
    price: ''
  }
  // ------------------ State ------------------
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProduct);
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState(defaultErrors);
  const [tempColors, setTempColor] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  // ------------------ Functions ------------------
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })
    setErrors({
      ...errors,
      [e.target.name]: ''
    })
  }
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = productValidation(product);
    const hasErrorMsg = Object.values(errors).some(err => err);
    console.log(hasErrorMsg);
    if (hasErrorMsg) {
      setErrors(errors);
      return
    }
    setProducts(prev => [...prev, { ...product, id: uuid(), colors: tempColors, category:selectedCategory }]);
    setProduct(defaultProduct);
    setTempColor([]);
    closeModal();
  }
  const onCancel = () => {
    setProduct(defaultProduct);
    setErrors(defaultErrors);
    setTempColor([]);
    closeModal();
  }
  const handleClick = (color: string) => {
    if (tempColors.includes(color)) {
      setTempColor(prev => prev.filter(c => c !== color))
    } else {
      setTempColor(prev => [...prev, color])
    }
  }
  // ------------------ Render ------------------
  const renderProductList = products.map((product) => <ProductCard key={product.id} product={product} />);
  const renderFormInputs = formInputsList.map(input => <div key={input.id} className='flex flex-col '>
    <label htmlFor={input.id} className='mb-[1px] text-sm font-medium text-gray-700'>{input.label}</label>
    <Input id={input.id} name={input.name} type={input.type} onChange={onChangeHandler} value={product[input.name]} />
    <ErrorMessage message={errors[input.name]} />
  </div>)
  const renderColors = colors.map(color => <CircleColor key={color} color={color} onClick={() => handleClick(color)} />)
  return (
    <main className='container'>
      <Button onClick={openModal} width='w-fit' className='bg-green-700 hover:bg-green-800 m-auto'>ADD ITEM</Button>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 m-5 rounded-md p-2'>
        {renderProductList}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} >
        <form className='space-y-3' onSubmit={submitHandler}>
          {renderFormInputs}
          <SelectMenu selected={selectedCategory} setSelected={setSelectedCategory} />
          <div className='flex items-center space-x-2'>
            {renderColors}
          </div>
          <div className='flex items-center space-x-2'>
            {tempColors.map((color, index) => <span key={index} className="p-1 mr-1 mb-1 text-xs text-white rounded-md " style={{ backgroundColor: color }}>{color}</span>)}
          </div>
          <div className='flex items-center space-x-3'>
            <Button className='bg-indigo-700 hover:bg-indigo-800'>Submit</Button>
            <Button onClick={onCancel} className='bg-gray-400 hover:bg-gray-500' type='button' >Cancel</Button>
          </div>
        </form>
      </Modal>
    </main>
  )
}

export default App
