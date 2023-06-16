import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import ShowCurrency from '../components/curencies/showCurencies';
import MyComponent from '../components/curencies/websocket';

function Home() {
    const { t } = useTranslation();
    const home_page = t('home_page', { returnObjects: true });

    return (
        <div className="container">
            <div className="row justify-content-center mt-3">
                <div className="col-md-8">
                    <h2>{home_page.page_title}</h2>
                </div>
            </div>
            <div className="row justify-content-center mt-3">
            </div>
            <div className="row mt-5 justify-content-center">
                <h2 className='text-center'>{home_page.title}</h2>
                <p>{home_page.description}</p>
            </div>
            <div className="row mt-5  justify-content-center bg-ligth diagram_block">
                <ShowCurrency/>
                {/* <MyComponent/> */}
            </div>
        </div>
    );
}
export default Home;