import React from 'react';
import "./BannerView.scss";

const BannerView: React.FC = () => {
    return (
        <div className="banner-container grid w-full flex flex-column justify-content-center align-items-center">
            <div className='banner-content col-10 flex flex-column justify-content-center align-items-center'>
                <h1>Thuê các nhà sáng tạo</h1>
                <p>Hãy tìm cho mình một người cộng tác tuyệt vời</p>
            </div>
        </div>
    );
};

export default BannerView;
