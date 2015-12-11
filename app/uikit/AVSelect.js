import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import 'select2';
import classNames from 'classnames'

import AVLabel from './AVLabel'

let count = 0;
export default class AVSelect extends Component {
	
  static propTypes = {
    data: PropTypes.array,
    events: PropTypes.array,
    options: PropTypes.object,
    multiple: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onSelect: PropTypes.func,
    onChange: PropTypes.func,
    onUnselect: PropTypes.func,
  }

  static defaultProps = {
    data: [],
    events: [
      ['change', 'onChange'],
      ['select2:open', 'onOpen'],
      ['select2:close', 'onClose'],
      ['select2:select', 'onSelect'],
      ['select2:unselect', 'onUnselect'],
    ],
    options: {},
    multiple: false,
  }

  constructor(props) {
    super(props);
    this.el = null;
    this.guid = 'input-select-' + count++;
  }

  componentDidMount() {
    this.el = $(ReactDOM.findDOMNode(this._select));
    this.el.select2(Object.assign(this.props.options,{placeholder:this.props.placeholder}));
    this.el.select2('val', this.props.value);

    this.props.events.forEach(event => {
      this.el.on(event[0], this.props[event[1]]);
    });
    $('.select2-container').addClass('form-control');
  }

  componentWillUnmount() {
    this.el.select2('destroy');
  }

  render() {
  	 var {id, inputRef, label, tooltipText, tooltipAlignment, showTooltip, bsStyle, help} = this.props;
  	id = id ? id : this.guid;
  	const helpBlock = help ? <span className="help-block">{help}</span>: undefined;
  	let bsStyleText = bsStyle ? 'has' + bsStyle : '';
  	const classes = classNames({'form-group':true,[ "has-" + (() => bsStyle)() ]: bsStyle});
    return (
    	<div className={classes} >
    	<AVLabel htmlFor={id} label={label} tooltipText={tooltipText} tooltipAlignment={tooltipAlignment} showTooltip={showTooltip}/>
    
      <select ref={c => this._select = c} multiple={this.props.multiple}>
         <option></option>
        {this.props.data.map((item, k) => {
          if (typeof item === 'string' ||
            ((!!item && typeof item === 'object') && Object.prototype.toString.call(item) === '[object String]')) {
            return (<option key={'option-' + k} value={item}>{item}</option>);
          }
          return (<option key={'option-' + k} value={item.id}>{item.text}</option>);
        })}
      </select>
     {helpBlock}
      </div>
    );
  }
}