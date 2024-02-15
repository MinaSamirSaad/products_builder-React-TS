import { useState } from 'react'
import ProductCard from './components/ProductCard'
import Modal from './components/UI/Modal';
import { productList, formInputsList } from './data'
import Button from './components/UI/Button';
import Input from './components/UI/Input';

function App() {
  // ------------------ State ------------------
  const [isOpen, setIsOpen] = useState(false)

  // ------------------ Functions ------------------
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  // ------------------ Render ------------------
  const renderProductList = productList.map((product) => <ProductCard key={product.id} product={product} />);
  const renderFormInputs = formInputsList.map(input => <div key={input.id} className='flex flex-col '>
    <label htmlFor={input.id} className='mb-[1px] text-sm font-medium text-gray-700'>{input.label}</label>
    <Input id={input.id} name={input.name} type={input.type}/>
  </div>)
  return (
    <main className='container'>
      <Button onClick={openModal} width='w-fit' className='bg-green-700 hover:bg-green-800'>ADD ITEM</Button>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 m-5 rounded-md p-2'>
        {renderProductList}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} >
        <form className='space-y-3'>
        {renderFormInputs}
        <div className='flex items-center space-x-3'>
          <Button onClick={closeModal} className='bg-indigo-700 hover:bg-indigo-800'>Submit</Button>
          <Button onClick={closeModal} className='bg-gray-400 hover:bg-gray-500'>Cancel</Button>
        </div>
        </form>
      </Modal>
    </main>
  )
}

export default App
