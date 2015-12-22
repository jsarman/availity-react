import React from 'react';
import { Panel, Button, Input, ButtonToolbar, Tooltip, OverlayTrigger } from 'react-bootstrap';
import AVLabel from './AVLabel';


let count = 0;

class AVTextInput extends React.Component {

  constructor(props) {
    super( props );
    this.guid = 'input-ui-' + count++;
  }

  render() {
    let {id, value, inputRef, label, tooltipText, tooltipAlignment, showTooltip, avValue, bsStyle, help, ...others} = this.props;
    id = id ? id : this.guid;

    const labelNode = <AVLabel {...this.props} htmlFor={id} />;
    let valueOverride, bsStyleOverride, helpBlock;
    if (avValue) {
      bsStyleOverride = avValue.errors ? 'error' : bsStyle;
      helpBlock = avValue.errors ? avValue.errors.message : help;
      valueOverride = avValue.value;
    } else {
      bsStyleOverride = bsStyle;
      helpBlock = help;
      valueOverride = value;
    }
    return (
      <Input id={id} type="text" value={valueOverride} bsStyle={bsStyleOverride} help={helpBlock} ref={inputRef} label={labelNode}  {...others} />
      );
  }

}

export default AVTextInput;