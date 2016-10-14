import React from 'react';

const Spinner = () => {
    return (
        <div className="outer">
            <div className="middle">
                <div className="inner">
                    <div className="sk-folding-cube">
                        <div className="sk-cube1 sk-cube"></div>
                        <div className="sk-cube2 sk-cube"></div>
                        <div className="sk-cube4 sk-cube"></div>
                        <div className="sk-cube3 sk-cube"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Spinner;
