import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddUser from './addUser.component';

class AddUsers extends Component {
    onAdd = (id, role) => {
        this.props.onAddMemberToCompany(id, role);
    }

    renderUsers = () => {
        return this.props.users.map(({ name, id, lastName, email }) => (
            <AddUser
                key={id}
                id={id}
                name={name}
                lastName={lastName}
                email={email}
                onAdd={(id, role) => this.onAdd(id, role)}
            />
        ));
    }

    render() {
        return this.renderUsers();
    }
}

AddUsers.propTypes = {
    users: PropTypes.array.isRequired,
    onAddMemberToCompany: PropTypes.func.isRequired,
}

export default AddUsers;