import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import axios from "axios";
import $ from 'jquery'

import correctIcon from '../../data/pics/correct-icon.png'
import backIcon from '../../data/pics/back-icon.png'

export default class Subjects extends Component{
    constructor(props){
        super(props);

        this.state = {
            code: null,
            name: null,
            credits: null
        };

        var self = this;
        var IDfromProps = props.match.params.id;

        axios.get('/api/subjects/' + IDfromProps).then(res => {
            var sbj = res.data;

            self.setState({
                code: sbj.code,
                name: sbj.name,
                credits: sbj.credits
            });
        }).catch(error => {
            alert("GRESKA");
        });

        this.changeState = this.changeState.bind(this);
    }

    changeState(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    resetErrors(){
        $('[data-valmsg-for]').html('');
    }

    submitForm(){
        axios.post("/api/subjects/update", JSON.stringify(this.state), {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then(res => {
            let JSONResult = JSON.parse(JSON.stringify(res));

            if(JSONResult.status == 200) //OK
            {
                $("#successOperation").dialog('open');
                this.resetErrors();
            }
        }).catch(error => {
            var errorCode = error.response.status;

            if(errorCode == 400) //Validation error
            {
                this.resetErrors();
                // OVA E NIZA [error1, error2, ...]
                var JSONResult = JSON.parse(JSON.stringify(error.response.data));

                for(let i=0; i<JSONResult.length; i++){
                    $("[data-valmsg-for=" + JSONResult[i].field + "]").html("<p>" + JSONResult[i].defaultMessage + "</p>");
                }
            }
        });
    }

    render() {
        $('#code').val(this.state.code);
        $('#name').val(this.state.name);
        $('#credits').val(this.state.credits);

        $("#sendForm").submit(function(e) {
            e.preventDefault();
        });

        $("#successOperation").hide();

        $("#successOperation").dialog({
            autoOpen: false,
            title: "Информација",
            draggable: false,
            modal: true,
            open: function(){
                $('.ui-dialog-titlebar-close').css("display", "none");
                $(this).removeClass(); //("alert alert-info");
                $(this).addClass("alert alert-info");
                $(this).css("margin", "5px 0 5px 0");
            },
            buttons: [
                {
                    text: "OK",
                    click: function () {
                        window.location = "/Subjects/";
                    }
                }
            ]
        });

        $('input').attr('autocomplete', 'off');

        return (
            <div className="container body-content">
                <div></div><div></div><br/>
                <form id="sendForm" onSubmit={() => this.submitForm()}>
                    <p className="infoMainThird left">Менување информации за предмет</p>
                    <hr style={{"marginTop":"10px","marginBottom":"10px"}}/>
                    <div className="left">
                        <a href="/Subjects" className="btn btn-warning">
                            <img style={{"width":"18px","marginTop":"-2px"}} src={backIcon}/> Назад
                        </a>
                        <button type="submit" className="btn btn-info">
                            <img style={{"width":"18px","marginTop":"-2px"}} src={correctIcon}/> Зачувај
                        </button>
                    </div>
                    <hr style={{"marginTop":"10px"}}/>
                    <div className="form-horizontal">
                        <div className="form-group">
                            <label className="control-label col-md-2" htmlFor="Code">Код</label>
                            <div className="col-md-10">
                                <input className="form-control text-box single-line" id="code"
                                       style={{"textTransform":"uppercase"}} type="text" disabled="disabled"/>
                                <input value={this.state.code} hidden name="code" id="codeHidden"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-md-2" htmlFor="Name">Предмет</label>
                            <div className="col-md-10">
                                <input className="form-control text-box single-line" id="name" name="name" type="text" onChange={this.changeState}/>
                                <span className="field-validation-valid text-danger" data-valmsg-for="name" data-valmsg-replace="true"></span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-md-2" htmlFor="Credits">Кредити</label>
                            <div className="col-md-10">
                                <select className="form-control" id="credits" name="credits" onChange={this.changeState}>
                                    <option value="">Одберете кредити</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                </select>
                                <span className="field-validation-valid text-danger" data-valmsg-for="credits" data-valmsg-replace="true"></span>
                            </div>
                        </div>
                    </div>
                </form>
                <div id="successOperation" className="alert alert-info">
                    Успешно направивте промена
                </div>

            </div>
        );
    }
}
