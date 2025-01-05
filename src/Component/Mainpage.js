import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Mealcards from './Mealcards';

const Mainpage = () => {
    const [data, setData] = useState();
    const [search, setSearch] = useState("");
    const [msg, setMsg] = useState("")
    const [allData, setAllData] = useState();

    const handleInput = (event) => {
        setSearch(event.target.value)
    }
    const myFun = async () => {
        if (search == "") {
            setMsg("Please Enter Something")
        } else {
            const get = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
            const jsonData = await get.json();
            // console.log(jsonData.meals);
            setData(jsonData.meals)
            setMsg("")

        }

    }
    const mainPageData = async () => {
        const getdata = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian`);
        const jsonAllData = await getdata.json();
        console.log('data', jsonAllData.meals);
      
        setAllData(jsonAllData.meals)
    }

    useEffect(() => {
        mainPageData()
    },[])

    // console.log(data);
    return (
        <>
            <h1 className='head'>FOOD RECIPE APP</h1>
            <div className='container'>
                <div className='searchBar'>
                    <input type='text' placeholder='Enter Dishe' onChange={handleInput} />
                    <button onClick={myFun}>Search</button>
                </div>
                {data ? <div>
                    <h4 className='msg'>{msg}</h4>
                    <div>
                        <Mealcards detail={data} />
                    </div>
                </div> : <div>
                   
                    <h1 style={{ color: 'green', fontSize: '70px', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>Wellcome In Recipe App</h1>
                  
                   <div style={{ display: "flex", flexWrap: 'wrap', justifyContent: 'space-between' }}> {allData?.map((data)=>{
                    return(
                        <div key={data.id} style={{ width: '23%', margin: '1%' }}>
                           <h2>{data.strMeal}</h2>
                           <img src={data.strMealThumb} alt='/' style={{width:'300px', borderRadius:'30px'}}/>
                          <NavLink to={`/${data.idMeal}`}> <button style={{backgroundColor:"green", padding:'10px', borderRadius:'30px', color:'white'}}>Check Recipe</button></NavLink>
                        </div>
                    )
                   })}
                      
                   </div>
                   
                  
                </div>}


            </div>
        </>
    )
}

export default Mainpage