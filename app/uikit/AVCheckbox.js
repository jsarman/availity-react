import React from 'react';
import AVLabel from './AVLabel';

let count = 0;
export default class AVCheckbox extends React.Component {

  constructor(props) {
    super( props );
    this.guid = 'input-cb-ui-' + count++;
  }

  render() {
    let {id, checked, avValue, ...others} = this.props;
    id = id ? id : this.guid;

    let valueOverride;
    if (avValue) {
      valueOverride = avValue.value;
    } else {
      valueOverride = checked;
    }
    return (
      <div className="checkbox">
  		<input id={id} type="checkbox" defaultChecked={valueOverride} value={valueOverride} {...others} />
  		<AVLabel {...this.props} htmlFor={id} />
	  </div>
      );
  }
}