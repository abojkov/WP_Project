import React from 'react';

import logo from '../data/pics/CASlogo.png'

function AboutInfo() {
    return (
        <div className="container body-content">
            <div style={{"text-align": "center"}}>
                <img src={logo} style={{"width": "7%", "vertical-align": "middle"}}/>
                <span style={{"font-size": "25px", "vertical-align": "middle"}}> FINKI e-System</span>
            </div>
            <hr />
            <div style={{ display: "block" }} className="col-sm-5">
                <div className="alert alert-info specificAlert specificAlertPlus">
                    <dl className="dl-horizontal" style={{ marginBottom: 0 }}>
                        <dt>
                            <span style={{ display: "block" }} className="specificLabel specificLabel2">
                            Автор
                            </span>
                        </dt>
                        <dd>
                            <span className="specificDisplay">Александар Бојков</span>
                        </dd>
                    </dl>
                </div>
                <div className="alert alert-info specificAlert specificAlertPlus">
                    <dl className="dl-horizontal" style={{ marginBottom: 0 }}>
                        <dt>
                            <span style={{ display: "block" }} className="specificLabel specificLabel2">
                            Индекс
                            </span>
                        </dt>
                        <dd>
                            <span className="specificDisplay">
                            173023
                             </span>
                        </dd>
                    </dl>
                </div>
                <div className="alert alert-info specificAlert specificAlertPlus">
                    <dl className="dl-horizontal" style={{ marginBottom: 0 }}>
                        <dt>
                            <span style={{ display: "block" }} className="specificLabel specificLabel2">
                            Телефонски број
                            </span>
                        </dt>
                        <dd>
                            <span className="specificDisplay">
                            +389 78 299 323
                             </span>
                        </dd>
                    </dl>
                </div>
                <div className="alert alert-info specificAlert specificAlertPlus">
                    <dl className="dl-horizontal" style={{ marginBottom: 0 }}>
                        <dt>
          <span
              style={{ display: "block" }}
              className="specificLabel specificLabel2"
          >
            Е-маил
          </span>
                        </dt>
                        <dd>
                            <span className="specificDisplay">a.bojkov@yahoo.com</span>
                        </dd>
                    </dl>
                </div>
                <div className="alert alert-info specificAlert specificAlertPlus">
                    <dl className="dl-horizontal" style={{ marginBottom: 0 }}>
                        <dt>
          <span
              style={{ display: "block" }}
              className="specificLabel specificLabel2"
          >
            Адреса
          </span>
                        </dt>
                        <dd>
                    <span className="specificDisplay">
            Скопје, Северна Македонија
            <br />
            ул. „Никола Парапунов“, бр.31
          </span>
                        </dd>
                    </dl>
                </div>
                <div className="alert alert-warning specificAlert specificAlertPlus">
                    <dl className="dl-horizontal" style={{ marginBottom: 0 }}>
                <span style={{ textAlign: "justify" }} className="specificDisplay">
          Оваа веб апликација е креирана како дел од курсот „Веб програмирање“, под менторство
          на проф. Ристе Стојанов и асистент Костадин Мишев.
        </span>
                    </dl>
                </div>
            </div>
            <div className="col-sm-7">
                <div className="mapouter">
                    <div className="gmap_canvas">
                        <iframe width="100%" height={500} id="gmap_canvas" src="https://maps.google.com/maps?q=Skopje%2C%20North%20Macedonia%20Nikola%20Parapunov%2C%20no.%2031&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} />
                        <a href="https://www.couponflat.com" />
                    </div>
                </div>
            </div>
            <hr />

        </div>
    );
}
export default AboutInfo;
