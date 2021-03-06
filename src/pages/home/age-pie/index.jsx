import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import echarts from 'echarts';

export default class Sunburst extends Component {
    state = {
        option: {},
        dom: null,
    };
    componentDidMount() {
        let dom = ReactDOM.findDOMNode(this.refs.agepie);
        this.setState({
            dom,
        });
    }
    render() {
        const { dom } = this.state;
        const option = this.props.option || {
            series: [],
            data: [],
        };
        if (dom) {
            let myChart = echarts.init(dom);
            myChart.setOption(option, true);
            // 添加自适应属性
            myChart.resize({
                width: dom.clientWidth,
            });
            window.addEventListener('resize', () => {
                myChart.resize({
                    width: dom.clientWidth,
                });
            });
        }

        return (
            <div
                ref="agepie"
                style={{ height: '430px' }}
                className="react_for_echarts"
            />
        );
    }
}
