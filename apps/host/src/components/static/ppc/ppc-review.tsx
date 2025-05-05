import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./ppc.module.scss";
import IconSVG from "@/components/iconsvg/IconSVG";
import { PPC_CONTACTS_USER_REVIEW, PPC_EYEGLASSES_USER_REVIEW } from "@/constants/ppcUserReviewConstants";

const PPCReview = (props: any) => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        if (props.data && props.data.isContacts) {
            setReviews(PPC_CONTACTS_USER_REVIEW)
        } else {
            setReviews(PPC_EYEGLASSES_USER_REVIEW)
        }
    })
    var settings = {
        dots: true,
        arrows: false
    };
    return (
        <div className="reviewContainer">
            <Slider {...settings}>
                {reviews && reviews.map((review: any, index: any) => {
                    return (<div className={style.reviewContainer} key={"index" + index}>
                        <div className={style.avatar} style={{ backgroundImage: `url("${review.image}")` }}></div>
                        <div className={style.userDetail}>
                            <div>{review.name}</div>
                            <div>
                                {review.stars && Array.from({ length: review.stars }).map((data: any, childIndex: any) => {
                                    return <IconSVG
                                        width="16"
                                        height="16"
                                        viewBox="0 0 10 10"
                                        fill="none"
                                        fillP="#fdcd0a"
                                        name="star_special"
                                        key={"child-index" + childIndex}
                                    />
                                })}
                            </div>
                        </div>
                        <div className={style.userReview}>
                            {review.content}
                        </div>
                    </div>)
                })}
            </Slider>
        </div>
    );
}

export default PPCReview;