import React from 'react';
import { ButtonGroup, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import { MYORDER_LIST } from '../../utils/urls';

import List from '../../components/UI/List/List';

const HEADERS = ['', 'Código', 'Usuario', 'Creación', 'Estado'];

const MealsList = props => {
	return (
		<div className="container">
			<h1>Mis Ordenes de comida</h1>
			<Button
				variant="success"
				onClick={() => props.history.push(`/myorders/new`)}
			>
				<FontAwesomeIcon icon={faPlus} /> Agregar Orden
			</Button>
			<List
				headers={HEADERS}
				url={MYORDER_LIST}
				renderRow={item => {
					return (
						<tr key={item._id}>
							<td>
								<ButtonGroup>
									<Button
										variant="info"
										onClick={() => props.history.push(`/orders/${item._id}`)}
									>
										<FontAwesomeIcon icon={faEdit} />
									</Button>
								</ButtonGroup>
							</td>
							<td>{item.code}</td>
							<td>{item.user.name}</td>
							<td>
								<Badge variant="info">
									{moment(item.createdAt).format('YYYY-MM-DD HH:mm')}
								</Badge>
							</td>
							<td>{item.state}</td>
						</tr>
					);
				}}
			/>
		</div>
	);
};

export default MealsList;
