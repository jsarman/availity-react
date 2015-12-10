import React from 'react'
import {findDOMNode} from 'react-dom'
import { Button, Glyphicon } from 'react-bootstrap';
import DateTimeField from 'bootstrap-datepicker'
import moment from 'moment'
import AvTextInput from './AVTextInput'


let calendarState  = 'hide'

class AVDateInput extends React.Component {
   
   
    static defaultProps = {
        showCalendar: true
    };

    static propTypes = {
        showCalendar: React.PropTypes.bool,
        datePickerOptions: React.PropTypes.object
       };

    componentDidMount() {
        const {store, modelKey, datePickerOptions} = this.props;
        if(store && modelKey ) {
            this.setState({
                value: store.getState()[modelKey]
            });
        }
       let showWarning = datePickerOptions && datePickerOptions.format;
       if(datePickerOptions) {
        delete datePickerOptions.format;
       }
        const options = _.merge({
          format: 'mm/dd/yyyy'
        },datePickerOptions);
        const {_input,state} = this;
        const self = this;
         $(findDOMNode(this._input)).find("input").datepicker(options).on('changeDate', function(event){
          // Hack to trigger the onChange of the AvTextInput
          if(_input.props.onChange) {
              _input.props.onChange({
                target: { 
                  value: event.format()
                }
              });
          }
        });

        if(showWarning) {
           console.error('Warning: datePickerOptions is preset to "mm/dd/yyyy" and was ignored from the options.');
        }
    }
     
    handleClick() {
      calendarState = calendarState === 'show'?'hide':'show';
      $(findDOMNode(this._input)).find("input").datepicker(calendarState);
    }
   
    render() {
        let { inputRef, showCalendar, ...others} = this.props;
        if(!inputRef) {
          inputRef = (c) => {
           this._input = c;
         }
        } else {
          this._input = inputRef;
        }
        const calendarIcon = (
          <Button onClick={this.handleClick.bind(this)}>
            <Glyphicon bsClass="icon" glyph="calendar" className="icon-calendar"/>
          </Button>
          )

      return (
          <AvTextInput  inputRef={inputRef} buttonAfter={showCalendar?calendarIcon:null} {...others} />
          )
    }
}
export default AVDateInput