import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { stageRepository } from '../../factory/stageRepository.factory';
import { TextField } from '@material-ui/core';

class ResourceFormStage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            leftovers: [],
            resources: [],
        }
    }
    componentDidMount() {
        Promise.all([
            stageRepository.getLeftoversForStage(this.props.stage.id),
            stageRepository.getResourcesForStage(this.props.stage.id),
        ])        
            .then(([leftovers, resources]) => this.setState(state => ({ ...state, leftovers, resources })));;
    }

    findUnitsForResource = gusId => {
        const gus = this.props.gusCategory.find(({ gus_id }) => gus_id === gusId);

        if (!gus) {
            return '';
        }

        return { id: gus.unit_id, name: gus.shortcut_unit };
    }

    findResourceId = gusId => {
        const gus = this.props.gusCategory.find(({ gus_id }) => gus_id === gusId);

        return gus.id;
    }

    renderResources() {
        return this.state.resources.map(resource => (
            <div className="resource-form-mini" key={resource.id} style={{ marginBottom: '.5em' }}>
                <TextField
                    type="number"
                    required
                    label={`${resource.name} ${this.findUnitsForResource(resource.gus) ? `[${this.findUnitsForResource(resource.gus).name}]` : ''}`}
                    onChange={e => this.props.onChangeResource(this.props.stage.id, this.findResourceId(resource.gus), { value: e.target.value, unitId: this.findUnitsForResource(resource.gus).id })}
                />
            </div>
        ));
    }

    render() {
        return (
            <React.Fragment>
                {this.state.resources.length > 0 ? <h3>Konfiguracja zasobów</h3> : ''}
                {this.renderResources()}
            </React.Fragment>
        )
    }
}

ResourceFormStage.propTypes = {
    stage: PropTypes.object,
    onChangeResource: PropTypes.func,
    gusCategory: PropTypes.array,
};

export default ResourceFormStage;