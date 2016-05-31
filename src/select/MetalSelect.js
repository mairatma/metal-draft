'use strict';

import bridge from 'metal-react';
import ReactSelect from 'react-select';
import JSXComponent from 'metal-jsx';

// That's all you have to do to use a React component inside Metal.js. Now you
// can treat it as a regular Metal.js component, and the connection to React
// will be handled automatically for you.
var Select = bridge(ReactSelect);

class SelectExample extends JSXComponent {
	created() {
		this.onChange = this.onChange.bind(this);
	}

	onChange(val) {
		console.log("Selected: ", val);
		this.value = val;
	}

	render() {
		return <Select
			name="form-field-name"
			value={this.value}
			options={options}
			onChange={this.onChange}
    />;
	}
}

SelectExample.STATE = {
	value: {
		value: 'one'
	}
};

var options = [
	{ value: 'one', label: 'One' },
	{ value: 'two', label: 'Two' }
];

export default SelectExample;
