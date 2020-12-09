
import React, { Component } from 'react';
import './App.css';
import IN from './components/input';
import { ConsoleWriter } from 'istanbul-lib-report';
class App extends Component {
  state = {
    input: "",
    inputs: [{ output: "", text: "" }],
    outputs: [
      { name: "", drain: "", gate: "", source: "", body: "", type: "" }
    ],

    inputs: [{ output: "", text: "" }],
  };
  inputText = (e) => {
    this.setState({ input: e })
  }
  parsing = (input) => {
    var empty = [];
    this.setState(this.state.inputs = empty)
    this.setState(this.state.outputs = empty)
    var res = input.split(";");
    const variable = [...this.state.inputs]
    const outputs = [...this.state.outputs]


    //------------dividing the inputs by ';'
    for (var i = 0; i < res.length - 1; i++) {
      var result = res[i].split("=");
      variable[i] = { output: result[0], text: result[1] }
    }

    this.setState(this.state.inputs = variable)
    console.log(this.state.inputs);

    // //-------------parsing the inputs"
    var counter = 0;

    for (var i = 0; i < variable.length; i++) {
      // console.log(variable[i].text.length)

      input = variable[i].text + "|";
      input = variable[i].text.replace(";", "")
      var res = input.split("|");
      /*
x|y;
z&s;
      */
      //then we loop over these res
      // compute these expressions which are in parrellel 
      for (var k = 0; k < res.length; k++) {
        console.log(res[0].length + " " + res[0])
        for (var j = 0; j < res[k].length; j++) {
          if (res[k][j] != "|" && res[k][j] != "&" && res[k][j] != "`" && res[k][j] != "\n") {
            if (j == 0) {
              if (j != res[k].length - 1 && (j != res[k].length - 2))
                outputs[counter] = { name: "M" + counter, drain: "N" + counter, gate: res[k][j + 1] == "`" ? res[k][j] : "~" + res[k][j], source: "vdd", body: "vdd", type: "pmos" }
              else
                outputs[counter] = { name: "M" + counter, drain: variable[i].output, gate: res[k][j + 1] == "`" ? res[k][j] : "~" + res[k][j], source: "vdd", body: "vdd", type: "pmos" }
              counter++;
            }
            else if (j == res[k].length - 1 || (j == res[k].length - 2)) {
              outputs[counter] = { name: "M" + counter, drain: variable[i].output, gate: res[k][j + 1] == "`" ? res[k][j] : "~" + res[k][j], source: outputs[counter - 1].drain, body: outputs[counter - 1].drain, type: "pmos" }
              counter++;
            }
            else {
              outputs[counter] = { name: "M" + counter, drain: "N" + counter, gate: res[k][j + 1] == "`" ? res[k][j] : "~" + res[k][j], source: outputs[counter - 1].drain, body: outputs[counter - 1].drain, type: "pmos" }
              counter++;
            }
          }
        }
      }
      //------------------------PDU-------------------------------------------------------------------------------
      //--convert--------------------//
      input = variable[i].text + "|";
      var converted = [];
      var counterC = 0;

      //A|B|C'
      //C
      for (var l = 0; l < input.length; l++) {

        if (input[l] == "|") {
          converted[counterC] = "&";
          counterC++;
        }
        else if (input[l] == "&") {
          converted[counterC] = "|";
          counterC++;
        }
        else if (input[l] != "|" && input[l] != "&" && input[l] != "`") {
          if (input[l + 1] == "`") {
            converted[counterC] = input[l]
            counterC++;
          }
          else {
            converted[counterC] = input[l]
            counterC++;
            converted[counterC] = "`";
            counterC++;

          }
        }

      }
      //------------------converted----------------------
      var convertedS = converted.join("");

      var res = convertedS.split("&");

      console.log(res);
      console.log("asda" + " " + convertedS);
      var blockS = [];


      for (var c = 0; c < res.length - 1; c++) {
        for (var p = 0; p < res[c].length; p++) {

          if (res[c][p] != "|" && res[c][p] != "&" && res[c][p] != "`" && res[c][p] != "\n") {
            console.log(res[1].length - 2 + res[c]);
            if (c == 0 && c == res.length - 2) {
              outputs[counter] = { name: "M" + counter, drain: variable[i].output, gate: res[c][p + 1] == "`" ? "~" + res[c][p] : res[c][p], source: 0, body: 0, type: "nmos" }
              counter++;

            }
            else {
              if (c == 0)
                var D = variable[i].output;
              else
                var D = blockS[c - 1]
              // var D = outputs[counter - 1].source;

              var S;
              if (c == res.length - 2)
                S = 0;
              else { S = "N" + counter; blockS[c] = S }

              outputs[counter] = { name: "M" + counter, drain: D, gate: res[c][p + 1] == "`" ? "~" + res[c][p] : res[c][p], source: S, body: S, type: "nmos" }
              counter++;
            }


          }
        }

      }

    }

    this.setState(this.state.outputs = outputs)
    this.setState(this.state.inputs = variable)
    console.log(this.state.inputs);
    console.log(this.state.outputs);
  }


  render() {

    return (

      <div  >

        <IN
          input={this.state.input}
          parsing={this.parsing}
          inputText={this.inputText}
          output={this.state.outputs}

        />
      </div>
    );
  }
}
export default App;
