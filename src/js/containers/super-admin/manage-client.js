import { connect } from 'react-redux';
import SuperAdminManageClient from '../../components/super-admin/manage-client';
import * as actions from '../../actions/super-admin';


const mapStateToProps = (state) => ({
    name: state.superAdmin.manageClient.name,
    email: state.superAdmin.manageClient.email,
    institution: state.superAdmin.manageClient.institution,
    department: state.superAdmin.manageClient.department,
    accountType: state.superAdmin.manageClient.accountType,
    paid: state.superAdmin.manageClient.paid,
    code: state.superAdmin.manageClient.code,
})

const SuperAdminManageClientContainer = connect(mapStateToProps, actions)(SuperAdminManageClient);

export default SuperAdminManageClientContainer;

