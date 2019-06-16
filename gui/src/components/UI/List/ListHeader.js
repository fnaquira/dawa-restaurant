import React from 'react';

const ListHeader = props => {
	return (
		<thead>
			<tr style={{ textAlign: 'center' }}>
				{props.headers.map((item, index) => (
					<td key={index}>{item}</td>
				))}
			</tr>
		</thead>
	);
};

export default ListHeader;
