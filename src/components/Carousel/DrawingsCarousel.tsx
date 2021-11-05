import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { TTheme } from "../../..";
import fakeDrawings from "../../FakeDatas/fakeDrawings";
import DrawingCardDesktop from "../Cards/DrawingCardDesktop";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 768 },
        items: 10,
        slidesToSlide: 2, // optional, default to 1.
    },
};

interface IProps {
    theme: string;
}
export default function DrawingsCarousel({ theme }: IProps) {
    const drawings = fakeDrawings.filter((drawing) => drawing.theme === theme);
    return (
        <Carousel
            swipeable
            draggable
            responsive={responsive}
            ssr
            infinite
            keyBoardControl
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="overflow"
        >
            {drawings.map((drawing) => (
                <DrawingCardDesktop drawing={drawing} />
            ))}
        </Carousel>
    );
}
