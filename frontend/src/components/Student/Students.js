import React, {Component} from 'react'
import axios from "axios";
import $ from 'jquery'

import searchIcon from '../../data/pics/search-icon.png'
import closeIcon from '../../data/pics/incorrect-icon.png'
import plusIcon from '../../data/pics/plus-icon.png'

export default class Students extends Component{

    constructor(props){
        super(props);

        this.state = {
          data: []
        }

        {/* STATIC CONTENT
        this.state = {
            data: [
                {"index": "173023", "name": "Александар", "surname": "Бојков", "totalExams": "22"},
                {"index": "173141", "name": "Тамара", "surname": "Марковска", "totalExams": "10"}
            ]
        };
        */}
    }

    componentDidMount() {

        axios.get("/api/students").then(res => {
            this.setState({
                data: res.data
            });

            console.log(this.state.data);
        }).catch(err => {
            var element = "<div class='alert alert-danger' style='margin: 0'>Не постои конекција до серверот каде се наоѓа базата на податоци. Ова значи дека серверот во моментот е неактивен.</div>"
            $('table').html(element);

            $('#findStudent, #newStudent').attr("disabled", "disabled");
            $('#newStudent').removeAttr("href");

        });

        //console.log(this.state.data)
        $("#errorIndexSearch").hide();
    }

    findStudent(){
        var indexSearched = $('#findIndex').val();

        axios.get("/api/students/" + indexSearched).then(res => {
            if(!indexSearched){
                $("#errorIndexSearch h5").text("Внесете индекс");
                $("#errorIndexSearch").slideDown(500);
            }
            else {
                $("#errorIndexSearch h5").text("Не постои студент со овој индекс");
            }

            if(res.data && indexSearched)
                //console.log(res.data);
                window.location = "/Exams/" + indexSearched;
            else
                //console.log("NOT FOUND");
                $("#errorIndexSearch").slideDown(500);
        }).catch(err => {
            console.log(err);
        });
    }

    render(){
        let data = this.state.data;

        $('#findIndex').keypress(function (e) {
            if (e.which === 13) {
                $('#findStudent').trigger('click');
                return false;
            }
        });

        return (
            <div className="container">
                <div className="left">
                    <div style={{"width":"50%","display":"inline-block"}}>
                        <div id="manipulate" style={{marginBottom: "25px"}}>
                            <input autoComplete="off" name="findIndex" id="findIndex" type="number" className="form-control"
                                   placeholder="Внеси индекс" style={{"display":"inline-block", "marginRight": "5px"}}
                                   onInput={() => {
                                       if($('#findIndex').val().length > 6)
                                           $('#findIndex').val($('#findIndex').val().slice(0, 6))
                                   }}/>
                            <button id="findStudent" type="button" onClick={() => this.findStudent()} className="btn btn-success" style={{"display":"inline-block", marginRight: "30px"}}>
                                <img style={{"width":"18px","marginTop":"-2px"}} src={searchIcon}/> Барај
                            </button>

                            <a href="/Students/new" style={{"display":"inline-block"}} id="newStudent" className="btn btn-warning">
                                <img style={{"width":"18px","marginTop":"-2px"}} src={plusIcon}/> Нов студент
                            </a>
                        </div>
                    </div>
                </div>

                <div id="errorIndexSearch" className="alert alert-danger" style={{width: "44%"}}>
                    <a style={{cursor: "pointer", float: "right", width: "3.5%", marginRight: "0"}} onClick={function () {
                        $('#errorIndexSearch').slideUp(500);
                    }}>
                        <img src={closeIcon} style={{width: "100%", float: "right"}}/>
                    </a>
                    <h5 style={{margin: "0", padding: "0"}}>Не постои студент со овој индекс</h5>
                </div>

                <table className={"table table-striped"}>
                    <tbody>
                    <tr style={{background: "gray", color: "white"}}>
                        <th>
                            Индекс
                        </th>
                        <th>
                            Име
                        </th>
                        <th>
                            Презиме
                        </th>
                        <th>
                            Положени испити
                        </th>
                        <th></th>
                    </tr>
                    {data.map(item => (
                        <tr className="table-hover" key={item.index}>
                            <td className="align-middle">{item.index}</td>
                            <td className="align-middle">{item.name}</td>
                            <td className="align-middle">{item.surname}</td>
                            <td className="align-middle">{item.totalExams}</td>
                            <td className="align-middle">
                                {/* <Link to={"/Students/" + item.index} activeClassName="current">{item.index}</Link> */}
                                <a className="btn btn-info" href={"/Students/" + item.index}>Детали</a>
                                <a className="btn btn-success" href={"/Exams/" + item.index }>Испити</a>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
