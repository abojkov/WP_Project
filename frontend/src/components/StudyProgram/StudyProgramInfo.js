import React, {Component} from 'react'
import axios from "axios";
import $ from 'jquery'

import correctIcon from '../../data/pics/correct-icon.png'
import backIcon from '../../data/pics/back-icon.png'

export default class ProfessorInfo extends Component{
    constructor(props){
        super(props);

        this.state = {
            id: null,
            name: null
        };

        var self = this;
        var IDfromProps = props.match.params.id;

        axios.get('/api/programs/' + IDfromProps).then(res => {
            var program = res.data;

            self.setState({
                id: program.id,
                name: program.name
            });
        }).catch(error => {
            alert("GRESKA");
        });

        this.changeState = this.changeState.bind(this);
    }

    componentDidMount() {
        $('#existentRecord').hide();
        $("#successOperation").hide();

        $('input').attr('autocomplete', 'off');

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
                        window.location = "/Programs/";
                    }
                }
            ]
        });
    }

    changeState(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    resetErrors(){
        $('#existentRecord').hide();
        $('[data-valmsg-for]').html('');
    }

    submitForm(){
        axios.post("/api/programs/update", JSON.stringify(this.state), {
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
            else if(errorCode == 409) //Duplicate
            {
                this.resetErrors();

                $('#existentRecord').show().html("<p>Постои оваа студиска програма</p>")
            }
        });
    }

    render() {
        $('#id').val(this.state.id);
        $('#name').val(this.state.name);

        $("#sendForm").submit(function(e) {
            e.preventDefault();
        });

        return (
            <div className="container body-content">
                <div></div><div></div><br/>
                <form id="sendForm" onSubmit={() => this.submitForm()}>
                    <p className="infoMainThird">Менување информации за студиска програма</p>
                    <hr style={{"marginTop":"10px","marginBottom":"10px"}}/>
                    <div className="left">
                        <a href="/Programs" className="btn btn-warning">
                            <img style={{"width":"18px","marginTop":"-2px"}} src={backIcon}/> Назад
                        </a>
                        <button type="submit" className="btn btn-info">
                            <img style={{"width":"18px","marginTop":"-2px"}} src={correctIcon}/> Зачувај
                        </button>
                    </div>
                    <hr style={{"marginTop":"10px"}}/>

                    <div className="alert alert-danger" id="existentRecord">
                        Професор со овие податоци веќе постои
                    </div>

                    <div className="form-horizontal">
                        <input name="id" id="id" hidden="hidden"/>

                        <div className="form-group">
                            <label className="control-label col-md-2" htmlFor="Name">Име</label>
                            <div className="col-md-10">
                                <input className="form-control text-box single-line" id="name" name="name" type="text" onChange={this.changeState}/>
                                <span className="field-validation-valid text-danger" data-valmsg-for="name" data-valmsg-replace="true"></span>
                            </div>
                        </div>
                    </div>
                </form>
                <div id="successOperation">
                    Успешно направивте промена
                </div>

            </div>
        );
    }
}
