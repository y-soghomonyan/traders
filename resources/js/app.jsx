

import './bootstrap';
import '../css/app.css'
import 'bootstrap/dist/css/bootstrap.css';
import i18n from './i18n';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Menu from './components/menu';
import Footer from './components/footer';





if(document.getElementById('app_front') && document.getElementById('footer')){
    ReactDOM.createRoot(document.getElementById('app_front')).render(     
        <BrowserRouter>
            <Menu />
        </BrowserRouter>        
    );
    
    ReactDOM.createRoot(document.getElementById('footer')).render(     
        <div>
            <Footer/>
        </div>
 
    );
}
