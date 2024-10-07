import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ImageSliderProps } from "./ImageSlider.props";

export default function ImageSlider (props: ImageSliderProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	
	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % props.images.length);
	};

	useEffect(() => {
		const intervalId = setInterval(nextSlide, 3000);
		return () => clearInterval(intervalId);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleClick = (direction: "left" | "right") => {
		if (direction === "left") {
			setCurrentIndex((prevIndex) => (prevIndex - 1 + props.images.length) % props.images.length);
		} else {
			nextSlide();
		}
	};
	const changeImage = (e: React.MouseEvent<HTMLDivElement>) => {
		const target = e.currentTarget; 
		const width: number = target.clientWidth;
		const offsetX = e.clientX - target.getBoundingClientRect().left; 
	  
		if (offsetX < width / 2) {
		  handleClick("left");
		} else {
		  handleClick("right");
		}
	  };
	
	return <>
		<Box
			component="div"
			onClick={changeImage}
			sx={{
				position: "relative",
				maxWidth: 600,
				margin: "auto",
				cursor: "pointer"
			}}>
			<img
				src={props.images[currentIndex]}
				alt={`Slide ${currentIndex + 1}`}
				style={{ width: "100%", borderRadius: "8px" }}
			/>
		</Box>
	 </>;
};
