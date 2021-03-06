import React, { Component } from 'react';
import { Row, Col, Card, message, Spin } from 'antd';
import Line from './line';
import Bar from './bar';
import Area from './area';
import Scatter from './scatter';
import RadialBar from './radialbar';
import Service from '@/service';
import './index.less';

export default class Rechart extends Component {
	state = {
		global_loading: false,
		all_data: {
			line: [],
			bar: [],
			area: [],
			scatter: [],
			radialbar: []
		}
	};
	componentWillMount() {
		Service.getREchartData().then((res) => {
			if (res.code === 1) {
				this.setState({
					all_data: res.data
				});
			} else {
				message.error('数据获取失败，请重试');
			}
		});
	}
	componentDidMount() {
		this.setState({ global_loading: true });
		setTimeout(() => {
			this.setState({ global_loading: false });
		}, 2000);
	}
	render() {
		const { global_loading, all_data } = this.state;
		return (
			<Spin spinning={global_loading} size="large">
				<Row gutter={16}>
					<Col>
						<Card title="折线图" className="chart-box">
							<Line data={all_data.line} />
						</Card>
					</Col>
					<Col md={12}>
						<Card title="柱状图" className="chart-box">
							<Bar data={all_data.bar} />
						</Card>
					</Col>
					<Col md={12}>
						<Card title="面积图" className="chart-box">
							<Area data={all_data.area} />
						</Card>
					</Col>
					<Col md={12}>
						<Card title="散点图" className="chart-box">
							<Scatter data={all_data.scatter} />
						</Card>
					</Col>
					<Col md={12}>
						<Card title="放射柱状图" className="chart-box">
							<RadialBar data={all_data.radialbar} />
						</Card>
					</Col>
				</Row>
			</Spin>
		);
	}
}
