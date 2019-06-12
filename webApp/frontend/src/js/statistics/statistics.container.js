import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BarChart } from '@material-ui/icons';
import { handleError } from '../api/handleErrors.service';
import BootstrapTable from 'react-bootstrap-table-next';
import { setStatistics } from '../redux/app.service';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Button } from '@material-ui/core';

class StatisticsContainer extends Component {
    constructor() {
        super();

        this.state = {
            statistics: [],
            alreadyFetch: false,
        };
    }

    componentDidMount() {
        if (this.props.companyIdWorkingFor && !this.state.alreadyFetch) {
            fetch(`http://localhost:8090/company/${this.props.companyIdWorkingFor}/statistics`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.JWT}`,
                }
            })
                .then(response => handleError(response))
                .then(response => response.json())
                .then(statistics => {
                    this.setState({ alreadyFetch: true });
                    const lineIds = statistics.map(({ line }) => line.id);
                    const uniqueLineIds = [...new Set(lineIds)];
                    const groupedStatistics = {};
                    uniqueLineIds.forEach(lineId => {
                        const lineStatistics = statistics.filter(({ line }) => line.id === lineId);
                        groupedStatistics[lineId] = [
                            ...lineStatistics,
                        ];
                    })

                    console.log('=============================', { groupedStatistics });
                    setStatistics(groupedStatistics);
                })
                .catch(err => {
                    console.warn("Caught error while trying to get company's statistics. ", err);
                    return Promise.reject(err);
                });
        }

    }

    componentDidUpdate() {
        if (this.props.companyIdWorkingFor && !this.state.alreadyFetch) {
            fetch(`http://localhost:8090/company/${this.props.companyIdWorkingFor}/statistics`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.JWT}`,
                }
            })
                .then(response => handleError(response))
                .then(response => response.json())
                .then(statistics => {
                    this.setState({ alreadyFetch: true });
                    const lineIds = statistics.map(({ line }) => line.id);
                    const uniqueLineIds = [...new Set(lineIds)];
                    const groupedStatistics = {};
                    uniqueLineIds.forEach(lineId => {
                        const lineStatistics = statistics.filter(({ line }) => line.id === lineId);
                        groupedStatistics[lineId] = [
                            ...lineStatistics,
                        ];
                    })

                    setStatistics(groupedStatistics);
                })
                .catch(err => {
                    console.warn("Caught error while trying to get company's statistics. ", err);
                    return Promise.reject(err);
                });
        }


    }
    sumLeftovers(statisticsStages) {
        let sum = 0;
        statisticsStages.forEach(({ stageLeftovers }) => stageLeftovers.forEach(({ value }) => sum += value));

        return sum;
    }

    renderOpenStatisticButton(cell, row) {
        console.log({ row });
        return row.id !== 'Suma' ? <button onClick={() => this.props.history.push(`/statistic/${row.statisticId}`)}>Szczegóły</button> : '';
    }

    
    renderStatisticGroup(statistics) {
        console.log({ statistics });
        let index = 0;
        let prepareDatesForLines = statistics.map(statistic => {
            index += 1;
            return ({
                id: index,
                carbonPrint: statistic.carbonPrint,
                material: statistic.materialWeight,
                product: statistic.productWeight,
                leftoversSum: this.sumLeftovers(statistic.statisticsStages),
                vegetable: statistic.vegetable.name,
                statisticId: statistic.id,
            });
        });

        prepareDatesForLines = [
            ...prepareDatesForLines,
            {
                id: 'Suma',
                carbonPrint: prepareDatesForLines.map(({ carbonPrint }) => carbonPrint).reduce((a, b) => a + b, 0).toFixed(2),
                material: prepareDatesForLines.map(({ material }) => material).reduce((a, b) => a + b, 0).toFixed(2),
                product: prepareDatesForLines.map(({ product }) => product).reduce((a, b) => a + b, 0).toFixed(2),
                leftoversSum: prepareDatesForLines.map(({ leftoversSum }) => leftoversSum).reduce((a, b) => a + b, 0).toFixed(2),
                vegetable: '',
            }
        ];

        const columns = [{
            dataField: 'id',
            align: 'center',
            text: '',
          }, {
            dataField: 'vegetable',
            align: 'center',
            text: 'Warzywo'
          }, {
            text: 'Produkt [kg]',
            align: 'center',
            dataField: 'product'
          }, {
            text: 'Surowiec [kg]',
            align: 'center',
            dataField: 'material'
          }, {
            text: 'Odpady [kg]',
            align: 'center',
            dataField: 'leftoversSum'
          }, {
            text: 'Ślad węglowy',
            align: 'center',
            dataField: 'carbonPrint'
          },
          {
            text: 'Otwórz',
            align: 'center',
            dataField: 'open',
            formatter: (cell, row) => this.renderOpenStatisticButton(cell, row),
          }];
          

        return (
            <div>
                Statystyki dla linii: {statistics[0].line.name}
                

                <BootstrapTable keyField='id' data={ prepareDatesForLines } columns={ columns } />

            </div>
        );
    }


    renderStatistics() {
        return Object.keys(this.props.statistics).map(lineIdKey => this.renderStatisticGroup(this.props.statistics[lineIdKey]));

    }

    render() {
        return (
            <div className="wrapper-content">
                <div className="header-icon"><BarChart style={{ color: '#ffcc66', fontSize: "55px" }} fontSize="large" /></div>
                <div className="header"> Statystyki </div>
                <ul>
                    {this.renderStatistics()}
                </ul>
            </div>
        );
    }
}
StatisticsContainer.propTypes = {
    companyIdWorkingFor: PropTypes.number,
    JWT: PropTypes.string,
    statistics: PropTypes.array,
}

const mapStateToProps = store => ({
    companyIdWorkingFor: store.companyWorkingFor.id,
    JWT: store.JWT,
    statistics: store.statistics,
});

export default connect(mapStateToProps)(StatisticsContainer);