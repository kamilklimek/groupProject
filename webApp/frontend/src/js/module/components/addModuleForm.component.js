import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { vegetableRepository } from '../../factory/vegetable.factory';
import { resourceRepository } from '../../factory/resource.factory';
import { leftoverRepository } from '../../factory/leftover.factory';
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated';

class AddModuleForm extends Component {
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
            vegetableRepository.getAllVegetables(), 
            resourceRepository.getAllResources(),
            leftoverRepository.getAllLeftovers()
        ])
        .then( ([vegetables, resources, leftovers]) => {
            this.setState({
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

        this.props.onSubmit({ name, power, vegetables, resources, leftovers });
    }


    render() {

        const {
            name, 
            power, 
            vegetables, 
            resources, 
            leftovers
        } = this.state;

        return (
            <form id="module-create-form" className="module-create-form" onSubmit={e => this.onSubmit(e)}>
                {this.props.errorMessage && <Paper className="error-box">{this.props.errorMessage}</Paper>}
                <TextField
                    label="Nazwa"
                    value={name}
                    onChange={this.onChangeName}
                    type="text"
                    fullWidth
                    required
                >Nazwa
                </TextField>
                <label className="warning-comment">*Wprowadź unikalną nazwę</label>
                <p></p>
                <TextField
                    label="Moc"
                    value={power}
                    onChange={this.onChangePower}
                    type="text"
                    fullWidth
                    // placeholder="0"
                >Moc
                </TextField>
                <p></p>
                <Select 
                    closeMenuOnSelect={false}
                    components={makeAnimated()}
                    value={vegetables}
                    isMulti
                    options={this.state.allVegetables}
                    onChange={this.onChangeVegetables}
                    placeholder = "Wybierz warzywa.."
                    maxMenuHeight = {150}
                    />
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

AddModuleForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
};

export default AddModuleForm;