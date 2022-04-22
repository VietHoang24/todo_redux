import React from 'react'

const fetchAPI = async (url,method,body1) => {
  
   const response= await fetch(url,{
      method: method,
      headers:{
        'Content-Type':"application/json"
      },
      body: JSON.stringify(body1)
      
  })

    const result=await response.json();
    console.log("result laf: ",result)
    return result

  
}

export default fetchAPI