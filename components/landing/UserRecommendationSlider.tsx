'use client';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import loremIpsum from "@/lib/Lorem";
import {Card, CardContent, CardHeader} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function UserRecommendationSlider() {
    const blocksRecommendationItems = [...Array(10)].map((value, index) => ({
        id: index + 1,
        title: `Recommendation ${index + 1} title`,
        description: `Recommendation ${index + 1} description ${loremIpsum.substring(0, 30)}`,
        image: `https://placehold.co/50x50`,
        date: '10 Junio 2024',
    }));

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        pauseOnFocus: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerMode: true,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                }
            },
        ]
    };

    return (
        <Slider {...settings} >
            {blocksRecommendationItems.map((item) => (
                <div key={item.id}>
                    <Card sx={{maxWidth: 345}}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label={item.title}>
                                    R
                                </Avatar>
                            }
                            title={item.title}
                            subheader={item.date}
                        />

                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {item.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </Slider>
    );
}
