import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import contactPhoto from "../../../static/assets/images/about/jordan-madrid-1476232-unsplash.jpg";

export default function() {
    return (
        <div className="content-page-wrapper">
            <div 
                className="left-column" 
                style={{
                    background: "url(" + contactPhoto + ") no-repeat",
                    backgroundSize: "100% 50%",
                    backgroundPosition: "up",
                }}
            >
            </div>

            <div className="right-column">
            <div className="contact-bullets-points">
                    <div className="bullet-point-group">
                        <div className="icon">
                            <FontAwesomeIcon  icon="phone" />
                        </div>

                        <div className="text">
                            +52 1 5525162957
                        </div>
                    </div>

                    <div className="bullet-point-group">
                        <div className="icon">
                            <FontAwesomeIcon  icon="envelope" />
                        </div>

                        <div className="text">
                            manuel.helaman.soto@gmail.com
                        </div>
                    </div>

                    <div className="bullet-point-group">
                        <div className="icon">
                            <FontAwesomeIcon  icon="map-marked-alt" />
                        </div>

                        <div className="text">
                            Mexico City, Mexico
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}