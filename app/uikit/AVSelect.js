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

    componentWillReceiveProps() {
      if(this.props.avValue){
        this.el.select2('val', this.props.avValue.value);
      } else {
        this.el.select2('val',this.props.value);
      }
    }

    componentDidMount() {
        this.el = $(ReactDOM.findDOMNode(this._select));
        this.el.select2(Object.assign(this.props.options, {
            placeholder: this.props.placeholder
        }));
        console.log(this._select)
        //this.el.select2('val', this.props.value);

        this.props.events.forEach(event => {
            this.el.on(event[0], this.props[event[1]]);
        });
        $('.select2-container').addClass('form-control');
    }

    componentWillUnmount() {
        this.el.select2('destroy');
    }

    render() {
        var {id, inputRef, label, tooltipText, tooltipAlignment, showTooltip, bsStyle, help, value, avValue} = this.props;
        id = id ? id : this.guid;
        if(avValue) {
           bsStyle = avValue.errors ? 'error' : bsStyle;
           help = avValue.errors ? avValue.errors.message : help;
           value = avValue.value;
        } else {
          value = this.props.value;
        }
        const helpBlock = help ? <span className="help-block">{help}</span> : undefined;

        const classes = classNames({
            'form-group': true,
            ["has-" + (() => bsStyle)()]: bsStyle
        });

        return (
            <div className={classes} >
      <AVLabel htmlFor={id} label={label} tooltipText={tooltipText} tooltipAlignment={tooltipAlignment} showTooltip={showTooltip}/>
    
      <select defaultValue={value} ref={c => this._select = c} multiple={this.props.multiple}>
         <option></option>
        {this.props.data.map((item, k) => {
                if (typeof item === 'string' ||
                        ((!!item && typeof item === 'object') && Object.prototype.toString.call(item) === '[object String]')) {
                    return (<option key={'option-' + k} value={item} selected={value === item ? 'selected':undefined}>{item}</option>);
                }
                return (<option key={'option-' + k} value={item.id} >{item.text}</option>);
            })}
      </select>
     {helpBlock}
      </div>
            );
    }
}