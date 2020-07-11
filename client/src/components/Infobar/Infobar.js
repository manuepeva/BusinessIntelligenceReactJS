import React from 'react';
import './Infobar.css';
import closeIcon from '../../Icons/closeIcon.png';
import onlineIcon from '../../Icons/onlineIcon.png';

const InfoBar = ({room}) => (
        <div className="infobar">
            <div className="containerIzquierdoInterno">
                <img className="onlineIcon" src={onlineIcon} />
            <h3>{room}</h3>
            </div>
            <div className="containerDerechoInterno">
             <a href="/"><img src={closeIcon}/></a>       
            </div>
        </div>
);

export default InfoBar;