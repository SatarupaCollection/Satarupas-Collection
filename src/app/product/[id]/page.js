"use client"
import React, { useEffect, useState } from 'react'
import Product from './Product'
import Loading from '@/app/components/Loading'

const Page = ({params}) => {
  const [loading, setLoading] = useState(true)
  const [data,setData]=useState([])
  const getData=async()=>{
    const response = await fetch('/api/item');
    const dat = await response.json();
    const specific=dat.data.filter((item)=>item._id==params.id)[0];
    setData(specific);
    setLoading(false);
  }
  useEffect(() => {
    getData();
  }
  , []);
    const {id} = params
    
  return (
    <div>
       {loading && <Loading />}
        <Product {...data} />
    </div>
  )
}

export default Page