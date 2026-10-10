import MainSlider from "../Component/MainSlider/MainSlider"
import ShopByCategory from './../Component/Shop By Category/ShopByCategory';
import FeaturesBar from "../Component/FeaturesBar/FeaturesBar";
import FeaturedProducts from "../Component/FeaturedProducts/FeaturedProducts";
// const ShopByCategory = dynamic(
//   () => import("./_component/Shop By Category/ShopByCategory"),
//   {
//     loading: () => <div className="bg-gray-400">Loading...</div>,
//   }
// );



export default function Home() {
  
  return <>

 <MainSlider/>
 <FeaturesBar/>
 <ShopByCategory/>
  <FeaturedProducts/>

  </>
}
