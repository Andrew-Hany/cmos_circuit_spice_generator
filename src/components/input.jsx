import React, { Component } from 'react';

export default class review extends Component {
    state = {
        login: false,
    }


    render() {

        return (

            <div className="container">
                <br />
                <br /> <br /> <br /> <br />
                <textarea type="text" onChange={(e) => this.props.inputText(e.target.value)} class="form-control" placeholder="input" />
                < button className="bg-success rounded col-2  p-2" onClick={() => this.props.parsing(this.props.input)}>run</button>

                <div className="row">
                    <div class="col-6">
                        <table>
                            <tr>
                                <th>name</th>
                                <th>drain</th>
                                <th>gate</th>
                                <th>source</th>
                                <th>body </th>
                                <th>type </th>
                            </tr>
                            {this.props.output.map(output => {
                                return (
                                    <tr>
                                        <td> {output.name}</td>
                                        <td>  {output.drain} </td>
                                        <td>   {output.gate}  </td>
                                        <td>   {output.source}  </td>
                                        <td>   {output.body}  </td>
                                        <td>   {output.type} </td>
                                    </tr>
                                )

                            })}
                        </table>
                    </div >


                    <br />
                    <br />
                    <br />
                    <br />
                    {/* <b > */}


                </div >

            </div >
        )
    }

}