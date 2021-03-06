import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Layout, Popover } from 'antd';
import SiderCustom from '_c/sider-custom';
import screenfull from 'screenfull';
import { withRouter } from 'react-router-dom';
import './index.less';
import avater from '@/assets/head.png';
import logo from '@/assets/logo.svg';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;

class MyHeader extends Component {
	state = {
		visible: false,
		user: '游客大大'
	};
	componentDidMount() {
		const user = sessionStorage.getItem('userName');
		user && this.setState({ user });
	}
	handleVisibleChange = (visible) => {
		this.setState({ visible });
	};
	popoverHide = () => {
		this.setState({
			visible: false
		});
	};
	toggleScreenFull = () => {
		if (screenfull.enabled) {
			screenfull.toggle();
		}
	};
	logOut = () => {
		sessionStorage.removeItem('userName');
	};
	render() {
		const { responsive = { data: {} } } = this.props;
		const { visible } = this.state;
		return (
			<Header className="header">
				{responsive.data.isMobile ? (
					<Popover
						content={<SiderCustom popoverHide={this.popoverHide} />}
						trigger="click"
						placement="bottomLeft"
						visible={visible}
						onVisibleChange={this.handleVisibleChange}
					>
						<Icon type="bars" className="header-trigger mobile-bar" />
					</Popover>
				) : (
					<span className="logo-box">
						<img src={logo} alt="logo" className="logo" />
						<span>React-Admin</span>
					</span>
				)}
				<Menu mode="horizontal" className="header-menu">
					<Menu.Item key="full" onClick={this.toggleScreenFull}>
						<Icon type="fullscreen" className="full-btn" />
					</Menu.Item>

					{!responsive.data.isMobile && (
						<Menu.Item key="welcome">
							<span className="welcome">你好 -{this.state.user}</span>
						</Menu.Item>
					)}

					<SubMenu title={<img src={avater} alt="头像" className="avatar" />}>
						<Menu.Item key="profile">个人信息</Menu.Item>
						<Menu.Item key="setting">系统设置</Menu.Item>
						<Menu.Item key="logout">
							<Link to="/login" onClick={this.logOut}>
								退出登录
							</Link>
						</Menu.Item>
					</SubMenu>
				</Menu>
			</Header>
		);
	}
}

export default withRouter(MyHeader);
