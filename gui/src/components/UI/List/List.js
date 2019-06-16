import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

import axios from '../../../utils/axios';

import ListHeader from './ListHeader';
import ListPagination from './ListPagination';
import Spinner from '../Spinner/Spinner';

class List extends Component {
	state = {
		data: [],
		total: 0,
		per_page: 10,
		page: 1,
		pages: 1,
		loading: false
	};
	componentDidMount() {
		this.loadData();
	}
	loadData = () => {
		this.setState({ loading: true });
		axios({
			...this.props.url,
			params: {
				page: this.state.page,
				per_page: this.state.per_page
			},
			headers: {
				Authorization: `Bearer ${this.props.token}`
			}
		})
			.then(response => {
				this.setState({
					loading: false,
					data: response.data.docs,
					page: response.data.page,
					pages: response.data.pages,
					total: response.data.total
				});
			})
			.catch(error => {
				console.error(error);
				alert('Hubo un error!');
			});
	};
	rowsHandler = rows => {
		this.setState({ per_page: rows }, () => this.loadData());
	};
	pageHandler = page => {
		this.setState({ page: page }, () => this.loadData());
	};
	render() {
		return (
			<Table striped bordered hover size="sm" responsive>
				<ListHeader headers={this.props.headers} />
				<tbody>
					{this.state.loading ? (
						<tr>
							<td
								style={{ textAlign: 'center' }}
								colSpan={this.props.headers.length}
							>
								<Spinner />
							</td>
						</tr>
					) : this.state.data.length > 0 ? (
						this.state.data.map(item => this.props.renderRow(item))
					) : (
						<tr>
							<td
								colSpan={this.props.headers.length}
								style={{ textAlign: 'center' }}
							>
								No hay resultados!
							</td>
						</tr>
					)}
				</tbody>
				<ListPagination
					sizeTd={this.props.headers.length}
					total={this.state.total}
					pages={this.state.pages}
					page={this.state.page}
					per_page={this.state.per_page}
					changeRows={this.rowsHandler}
					changePage={this.pageHandler}
				/>
			</Table>
		);
	}
}

const mapStateToProps = state => {
	return {
		token: state.token
	};
};

export default connect(mapStateToProps)(List);
