function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
class App extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "checkType",














































































































    type => {
      if (this.state.type == '') {
        this.setState({ type: type });
      } else if (this.state.type == 'result') {
        if (type == 'number') {
          this.setState({
            type: 'number',
            input: [] });

        } else {
          this.setState(prev => ({
            type: 'operator',
            input: [this.state.output] }));

        }
      } else if (this.state.type != type) {
        this.setState(prev => ({
          input: prev.input.concat(prev.output),
          type: type }));

      }
    });this.state = { output: '0', input: [], type: '', result: false };this.handleNumbers = this.handleNumbers.bind(this);this.handleClear = this.handleClear.bind(this);this.handleDecimal = this.handleDecimal.bind(this);this.checkType = this.checkType.bind(this);this.handleOperators = this.handleOperators.bind(this);this.handleEvaluate = this.handleEvaluate.bind(this);this.handleResult = this.handleResult.bind(this);}handleNumbers(e) {this.checkType('number');if (this.state.output == '0' || !this.state.output.match(/\d/g)) {this.setState({ output: e.target.value });} else {this.setState(prev => ({ output: prev.output + e.target.value }));}}handleOperators(e) {this.checkType('operator');if (!this.state.input.length && this.state.type == '') {if (e.target.value == '-') {this.setState({ output: '-' });} else {this.setState({ output: e.target.value, type: '' });}} else if (e.target.value == '-' && this.state.output.match(/^[-+x/]$/)) {this.setState(prev => ({ output: prev.output + '-' }));} else {this.setState({ output: e.target.value });}}handleClear(e) {if (e.target.value == "all") {this.setState({ output: '0', input: [], type: '' });} else if (this.state.output.length == 1) {if (this.state.input.length == 0) {this.setState({ output: '0', input: [], type: '' });} else {this.setState(prev => ({ output: prev.input.at(-1), input: prev.input.slice(0, -1), type: prev.input.at(-1).match(/\d/) ? 'number' : 'operator' }));}} else {this.setState(prev => ({ output: prev.output.slice(0, -1) }));}}handleDecimal() {this.checkType('number');if (!this.state.output.match(/\d/g)) {this.setState({ output: '0.' });} else if (!this.state.output.match(/\./g)) {this.setState(prev => ({ output: prev.output + '.' }));}}handleEvaluate() {this.checkType('operator');this.setState({ result: true });}handleResult(val) {this.setState({ result: false, output: val, type: 'result' });}


  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "calculator" }, /*#__PURE__*/
      React.createElement(Output, {
        output: this.state.output,
        formula: this.state.input,
        result: this.state.result,
        newFormula: this.handleResult }), /*#__PURE__*/

      React.createElement(Buttons, {
        numbers: this.handleNumbers,
        decimal: this.handleDecimal,
        delete: this.handleClear,
        operation: this.handleOperators,
        result: this.handleEvaluate })));




  }}


class Output extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      equals: '' };

    this.updateOutput = this.updateOutput.bind(this);
  }
  componentDidUpdate(props, state) {
    if (state.equals == '=')
    this.setState({ equals: '' });
  }

  updateOutput(log = this.props.formula) {
    if (this.props.result) {
      let res = log.map(it => /.-$/.test(it) ? [it[0], it[1]] : it).
      flat().join('').replace(/x/g, '*').replace(/--/g, '+');
      this.setState({
        equals: '=' });

      this.props.newFormula(`${Math.round(eval(res) * 100000) / 100000}`);
    } else {
      return log;
    }

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "screen" }, /*#__PURE__*/
      React.createElement("div", { id: "input" }, this.updateOutput(), " ", this.state.equals), /*#__PURE__*/
      React.createElement("div", { id: "display" }, this.props.output)));


  }}


class Buttons extends React.Component {
  render() {
    let numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    return /*#__PURE__*/(
      React.createElement("div", { className: "buttons" },
      numbers.map((it, ind) => /*#__PURE__*/
      React.createElement("button", {
        id: it,
        onClick: this.props.numbers,
        value: ind,
        className: "num" }, ind)), /*#__PURE__*/
      React.createElement("button", {
        id: "decimal",
        className: "num",
        onClick: this.props.decimal }, "."), /*#__PURE__*/
      React.createElement("button", { id: "equals", onClick: this.props.result }, "="), /*#__PURE__*/
      React.createElement("button", { id: "add", onClick: this.props.operation, value: "+" }, "+"), /*#__PURE__*/
      React.createElement("button", { id: "subtract", onClick: this.props.operation, value: "-" }, "-"), /*#__PURE__*/
      React.createElement("button", { id: "multiply", onClick: this.props.operation, value: "x" }, "x"), /*#__PURE__*/
      React.createElement("button", { id: "divide", onClick: this.props.operation, value: "/" }, "/"), /*#__PURE__*/
      React.createElement("button", { id: "clear", onClick: this.props.delete, value: "all" }, "AC"), /*#__PURE__*/
      React.createElement("button", { id: "clear-one", onClick: this.props.delete }, /*#__PURE__*/
      React.createElement("i", { className: "fas fa-backspace" }))));

  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));