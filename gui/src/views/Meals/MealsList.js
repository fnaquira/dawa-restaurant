import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

import * as URLS from '../../utils/urls';

import List from '../../components/UI/List/List';

const HEADERS = ['', 'Nombre', 'Precio'];

const MealsList = props => {
	return (
		<div className="container">
			<h1>Platos de comida</h1>
			<Button
				variant="success"
				onClick={() => props.history.push(`/meals/new`)}
			>
				<FontAwesomeIcon icon={faPlus} /> Agregar Plato
			</Button>
			<List
				headers={HEADERS}
				url={URLS.MEALS_LIST}
				renderRow={item => {
					return (
						<tr key={item._id}>
							<td>
								<ButtonGroup>
									<Button
										variant="info"
										onClick={() => props.history.push(`/meals/${item._id}`)}
									>
										<FontAwesomeIcon icon={faEdit} />
									</Button>
								</ButtonGroup>
							</td>
							<td>{item.name}</td>
							<td>{item.price}</td>
						</tr>
					);
				}}
			/>
		</div>
	);
};

export default MealsList;
