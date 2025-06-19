import AsideComp from "@/components/Aside"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const AffirmationsPage = () => {
  const settings = {
     autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const arr = [1,"You say wetin",3,4,5,6]
  return (
    <div className="bg-[#1C1D1E]">
        <AsideComp />
        <div className="text-black h-[100vh] border-4 border-white mx-auto w-[70%] md:w-[80%]  pt-5 p-2">
            Affirmations of the day
    <Slider {...settings} className="bg-red-500 border-2  border-white mt-10 size-[300px] w-[80%] mx-auto m-auto">
                {arr.map((t,i) => (
                <div key={i}>
                  <h3>{t}</h3>
                </div>

                ))}
                {/* <div>
                  <h3>2</h3>
                </div>
                <div>
                  <h3>3</h3>
                </div>
                <div>
                  <h3>4</h3>
                </div>
                <div>
                  <h3>5</h3>
                </div>
                <div>
                  <h3>6</h3>
                </div> */}
    </Slider>
        </div>
    </div>
  )
}

export default AffirmationsPage