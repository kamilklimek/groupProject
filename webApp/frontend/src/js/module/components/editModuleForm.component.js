import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { moduleRepository } from '../../factory/moduleRepository.factory';
import { vegetableRepository } from '../../factory/vegetable.factory';
import { resourceRepository } from '../../factory/resource.factory';
import { leftoverRepository } from '../../factory/leftover.factory';
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated';


class EditModuleForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            power: 0,
            vegetables: [],
            resources: [],
            leftovers: [],
            allVegetables: [],
            allResources: [],
            allLeftovers: [],
        };
    }

    componentDidMount(){

        Promise.all([
            moduleRepository.getModuleById(this.props.id), 
            vegetableRepository.getAllVegetables(),
            resourceRepository.getAllResources(),
            leftoverRepository.getAllLeftovers(),
        ])
        .then( ([moduleModel, vegetables, resources, leftovers]) => {
            this.setState({
                name: moduleModel.name,
                power: moduleModel.power,
                vegetables: moduleModel.vegetables.map(v => ({ ...v, value: v.id, label: v.name })),
                resources: moduleModel.resources.map(v => ({ ...v, value: v.id, label: v.name })),
                leftovers: moduleModel.leftovers.map(v => ({ ...v, value: v.id, label: v.name })),
                allVegetables: vegetables.map(v => ({ ...v, value: v.id, label: v.name })),
                allResources: resources.map(v => ({ ...v, value: v.id, label: v.name })),
                allLeftovers: leftovers.map(v => ({ ...v, value: v.id, label: v.name }))
            });

        })
        
    }


    onChangeName = e => {
        const { value: name } = e.target;

        this.setState(state => ({ ...state, name }));
    }

    onChangePower = e => {
        const { value: power } = e.target;

        this.setState(state => ({ ...state, power }));
    }

    onChangeVegetables = e => {
        const vegetables = e;

        this.setState(state => ({ ...state, vegetables }));
    }

    onChangeResources = e => {
        const resources = e;

        this.setState(state => ({ ...state, resources }));
    }

    onChangeLeftovers = e => {
        const leftovers = e;

        this.setState(state => ({ ...state, leftovers }));
    }


    onSubmit = (e = { preventDefault: () => {} }) => {
        e.preventDefault();
        const { name, power, vegetables, resources, leftovers } = this.state;

        this.props.onSubmit({ name, power, vegetables, resources, leftovers, id: this.props.id });
    }


    render() {

        const {
            name, 
            power, 
            resources, 
            leftovers
        } = this.state;

        return (
            <form id="module-edit-form" className="module-edit-form" onSubmit={e => this.onSubmit(e)}>
                {this.props.errorMessage && <Paper className="error-box">{this.props.errorMessage}</Paper>}
                <TextField
                    label="Nazwa"
                    value={name}
                    onChange={this.onChangeName}
                    type="text"
                    fullWidth
                >Nazwa
                </TextField>
                <TextField
                    label="Moc"
                    value={power}
                    onChange={this.onChangePower}
                    type="text"
                    fullWidth
                >Moc
                </TextField>
                <p></p>
                <Select 
                    closeMenuOnSelect={false}
                    components={makeAnimated()}
                    value={resources}
                    isMulti
                    options={this.state.allResources}
                    onChange={this.onChangeResources}
                    placeholder="Wybierz zasoby.."
                    maxMenuHeight = {100}
                    />
                <p></p>
                <Select 
                    closeMenuOnSelect={false}
                    components={makeAnimated()}
                    value={leftovers}
                    isMulti
                    options={this.state.allLeftovers}
                    onChange={this.onChangeLeftovers}
                    placeholder="Wybierz rodzaj selekcji.."
                    maxMenuHeight = {65}
                    />
                <p></p>
                <Button 
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="module-edit__button"
                    onClick={this.onSubmit}
                >Zapisz
                </Button>
            </form>                
        );
    }
}

EditModuleForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default EditModuleForm;