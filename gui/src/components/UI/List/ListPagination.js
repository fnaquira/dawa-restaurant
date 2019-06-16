import React, { Fragment } from 'react';
import { Badge, Pagination } from 'react-bootstrap';

const LENGTH_PAGES = 3;
const OPTIONS = [10, 25, 50];

const ListPagination = props => {
	const pages = [];
	for (
		let i = props.page - LENGTH_PAGES, j = props.page + LENGTH_PAGES;
		i <= j;
		i++
	) {
		if (i > 0 && i <= props.pages) pages.push(i);
	}
	const paging = (
		<div style={{ display: 'flex', flexDirection: 'row' }}>
			<div style={{ flex: 1, textAlign: 'center', paddingLeft: 10 }}>
				Total de registros <Badge variant="secondary">{props.total}</Badge>
			</div>
			{props.total === 0 ? null : (
				<Fragment>
					<div className="form-group">
						<select
							className="form-control"
							value={props.per_page}
							onChange={event => props.changeRows(event.target.value)}
						>
							{OPTIONS.map(item => (
								<option key={item} value={item}>
									{item} registros por página
								</option>
							))}
						</select>
					</div>
					<div style={{ flex: 2, textAlign: 'center', paddingLeft: 10 }}>
						<Pagination>
							<Pagination.First onClick={props.clickFirst} />
							{pages.map(item => {
								if (item === props.page) {
									return (
										<Pagination.Item key={item} disabled>
											{item}
										</Pagination.Item>
									);
								} else {
									return (
										<Pagination.Item
											key={item}
											onClick={() => props.changePage(item)}
										>
											{item}
										</Pagination.Item>
									);
								}
							})}
							<Pagination.Last onClick={props.clickLast} />
						</Pagination>
					</div>
				</Fragment>
			)}
		</div>
	);
	return (
		<tfoot>
			<tr>
				<td colSpan={props.sizeTd}>{paging}</td>
			</tr>
		</tfoot>
	);
};

export default ListPagination;
