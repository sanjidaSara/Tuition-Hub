

import Marquee from "react-fast-marquee";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Banner = () => {
    return (
        <div>
          <Marquee className="text-4xl text-bold" pauseOnHover={true}>
          Welcome to Tuition Hub – where learning meets opportunity! Students can find the perfect tutor to guide them through their academic journey, while tutors can connect with students eager to learn. Whether you’re here to achieve academic excellence or share your expertise, we’re here to support you every step of the way !!!
</Marquee>  
<Marquee pauseOnHover={true}  className="w-1/3">
<SwiperSlide className=""><img src="https://as2.ftcdn.net/v2/jpg/05/14/95/15/1000_F_514951527_KTXwCvHvKuQX8DLyv6jS3gwnpOWAzIqJ.jpg" alt="" /></SwiperSlide>
      <SwiperSlide><img src="https://as1.ftcdn.net/v2/jpg/03/53/86/88/1000_F_353868803_zY9Y89KoiCcFysxrPOD68EFRIb4vgaWW.jpg" alt="" /></SwiperSlide>
      <SwiperSlide><img src="https://as2.ftcdn.net/v2/jpg/05/14/95/15/1000_F_514951507_sBv3uFYTFO8dOwpKB7JZ7auZdmM2xO1l.jpg" alt="" /></SwiperSlide>
      

    
    </Marquee>
        </div>
    );
};


export default Banner;