import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { moduleRepository } from '../../factory/moduleRepository.factory';
import { vegetableRepository } from '../../factory/vegetable.factory';
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated';
import { stageRepository } from '../../factory/stageRepository.factory';


class AddStageForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            modulesOrder: '',
            modulesModels: [],
            avaliableModules: [],
            allModules: [],
            allVegetables: [],
            selectedVegetables: [],
            isVegetableSelected: false,
            dialog_show: false,
        };
    }

    componentDidMount(){
        Promise.all([
            moduleRepository.getCompanyModules(), 
            moduleRepository.getDefaultModules(),
            vegetableRepository.getAllVegetables(),
        ])
        .then( ([companyModules, defaultModules, vegetables]) => {
            this.setState({
                allModules: [...companyModules, ...defaultModules].map(v => ({ ...v, value: v.id, label: v.name })),
                allVegetables: vegetables.map(v => ({ ...v, value: v.id, label: v.name }))
            });
        })
    }


    onChangeName = e => {
        const { value: name } = e.target;

        this.setState(state => ({ ...state, name }));
    }


    onChangeModules = e => {
        const modulesModels = e;

        this.setState(state => ({ ...state, modulesModels }));
        this.setState({modulesOrder: ''});
        let order = '';
        modulesModels.forEach(element => {
            order = order + element.id.toString() + ';';
        });
        this.setState({modulesOrder: order});

    }

    onCloseDialog = () => {
        this.setState({dialog_show: false});
    }

    onClickQuickView = () => {
        this.setState({dialog_show: true});
    }

    onChangeVegetables = e => {
        const selectedVegetables = e;

        this.setState(state => ({ ...state, selectedVegetables }));
        if (selectedVegetables.length !== 0) {
            this.setState({
                isVegetableSelected: true,
            })
            Promise.all([
                stageRepository.getModulesByVegetableList(selectedVegetables),
            ]).then( ([modulesResponse]) => {
                this.setState({avaliableModules: modulesResponse.map(v => ({ ...v, value: v.id, label: v.name })) });
            })

        }
        else {
            this.setState({isVegetableSelected: false})
        }
    }


    onSubmit = (e = { preventDefault: () => {} }) => {
        e.preventDefault();
        const { name, modulesModels, modulesOrder } = this.state;

        this.props.onSubmit({ name, modulesModels, modulesOrder });
    }


    render() {

        const {
            name, 
            modulesModels,
            avaliableModules,
            selectedVegetables,
            allVegetables,
            isVegetableSelected,
        } = this.state;

        let modulesByVegetable;
        if (isVegetableSelected) {
            modulesByVegetable = (
                <React.Fragment>
                    Dostępne moduły:
                    <br></br>
                    <p></p>
                    <label className="warning-comment">*Kolejność dodawania ma znaczenie</label>
                    <Select
                        closeMenuOnSelect={false}
                        components={makeAnimated()}
                        value={modulesModels}
                        isMulti
                        options={avaliableModules}
                        onChange={this.onChangeModules}
                        placeholder = "Wybierz moduły.."
                        maxMenuHeight = {60}
                    />
                    <p></p>
                </React.Fragment>
            )
        }

        return (


            <form id="stage-edit-form" className="stage-edit-form" onSubmit={e => this.onSubmit(e)}>
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
                <Select 
                    closeMenuOnSelect={false}
                    components={makeAnimated()}
                    value={selectedVegetables}
                    isMulti
                    options={allVegetables}
                    onChange={this.onChangeVegetables}
                    placeholder="Wybierz warzywo.."
                    maxMenuHeight = {100}
                    />
                <p></p>

                {modulesByVegetable}
    

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="stage-add__button"
                    onClick={this.onSubmit}
                >Zapisz
                </Button>
            </form>                
        );
    }
}

AddStageForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default AddStageForm;