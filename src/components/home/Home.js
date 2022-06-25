import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Carouselbody from '../carouselbody/Carouselbody'
import { useState } from 'react'
import { useEffect } from 'react'
import { showLabels } from '../../services/label'
import GridComponent from '../common/grid-content/grid-content.component'


const Home = () => {
  let [banner, setBanner] = useState([]);
  let [brand, setBrands] = useState([]);

  const getAllBanners = async () => {
    try{
      let result = await showLabels('banner');
      if(result.status){
        setBanner(result.result);
      }
    }catch(error){
      console.error("banner error: ", error)
    }
  }

  const getAllBrands = async () => {
    try{
      let result = await showLabels('brand', 12);
      if(result.status){
        setBrands(result.result);
      }
    }catch(error){
      console.error("brand error: ", error)
    }
  }

  useEffect(() => {
    getAllBanners();
    getAllBrands();
  },[])
  return (
    <React.Fragment>
        
        <Carouselbody data={banner}/>
        <GridComponent 
        title="Our Brands"
        data={brand}
        />
        
       
    </React.Fragment>
  )
}

export default Home