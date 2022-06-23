import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, productSelectors, updateProduct } from '../features/productSlice';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [image, setImage] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const product = useSelector((state) => productSelectors.selectById(state, id));

    // dapat datanya dari store
    useEffect(()=> {
        dispatch(getProducts())
    }, [dispatch])

    // data yang terdapat pada product ingin set ke statenya
    // agar di placeholdenrya ad value
    useEffect(()=> {
        if(product){
            setTitle(product.title);
            setPrice(product.price);
            setImage(product.Image);
        }
    }, [product])

    const handleUpdate = async(e) => {
        e.preventDefault()
        await dispatch(updateProduct({id, title, price, image}))
        navigate('/');
    }

  return (
    <form onSubmit={handleUpdate} className='box mt-5'>
        <div className="field">
            <label className='label'>Title</label>
            <div className="control">
                <input 
                type="text" 
                className="input" 
                placeholder='Title' 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </div>
        </div>
        <div className="field">
            <label className='label'>Price</label>
            <div className="control">
                <input 
                type="text" 
                className="input" 
                placeholder='Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)} 
                />
            </div>
        </div>
        <div class="file has-name is-fullwidth">
        <label class="file-label">
            <input 
            class="file-input" 
            type="file" 
            name="resume"
            // value={image}
            onChange={(e) => setImage(e.target.value)}
            />
            <span class="file-cta">
            <span class="file-icon">
                <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
                Choose a file…
            </span>
            </span>
            <span class="file-name">
            Screen Shot 2017-07-29 at 15.54.25.png
            </span>
        </label>
        </div>
        <div className="field">
            <button className="button is-succes">Submit</button>
        </div>
    </form>
  )
}

export default EditProduct