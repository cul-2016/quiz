import { connect } from 'react-redux';
import LecturerDashboard from '../components/lecturer/dashboard';

const mapStateToProps = () => {

    return {
        modules: [
            {
                code: 'MOD1',
                name: 'Psychology 101'
            },
            {
                code: 'MOD2',
                name: 'Psychology 101'
            }
        ]
    };
};

const LecturerDashboardContainer = connect(mapStateToProps)(LecturerDashboard);

export default LecturerDashboardContainer;
