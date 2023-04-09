import React,{useState,useEffect} from 'react'

const ProductList = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(products => setProducts(products))
            console.log(products);
    }, [])
  return (
    <div>HomeworkByHeart
    {products.map((product : {id: number , title: string ,price: number,image:string}) => {
        return (
            <div>
                <ul key={product.id}>{product.title}</ul>
                <ul key={product.id}>{product.price}</ul>
                <img src={product.image} alt="product" />
            </div>
            )
    })}
    </div>
  )
}

export default ProductList