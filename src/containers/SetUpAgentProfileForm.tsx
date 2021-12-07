import * as React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import {
    FormControlLabel,
    TextField,
    Button,
    Checkbox,
    Grid,
    InputAdornment,
    Typography,
    Divider, Card, useMediaQuery
} from '@material-ui/core';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import {useTheme} from "@material-ui/core/styles";

const renderTextField = ({
                             input,
                         }) => (
    <TextField
        id="input-with-icon-textfield" variant="outlined"
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <AlternateEmailIcon />
                </InputAdornment>
            ),
        }}
    />
)

interface SetUpAgentProfileFormProps extends Partial<InjectedFormProps> {
    handleSubmit?: any,
    enableButton: boolean,

}

const SetUpAgentProfileForm = (props: SetUpAgentProfileFormProps) => {
    const { handleSubmit, enableButton } = props;
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
    const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{marginBottom:"3em"}}
        >
            <Card style={{padding:"2em"}}>
                <Typography variant={"h6"}>Finish Account Setup</Typography>
            <form onSubmit={handleSubmit}>
                <Divider />
                {/*<Grid container direction={"row"} style={{padding:"2em"}}>*/}
                    <Typography variant={"h6"} gutterBottom>UserName</Typography>
                    <Field name="firstName" type="text" component={renderTextField} label="First Name" />
                {/*</Grid>*/}
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{marginTop: "1.5em"}}
                >
                    <Button color="primary" variant="contained" onClick={handleSubmit} disabled={!enableButton} >
                        Complete
                    </Button>
                </Grid>
            </form>
            </Card>
        </Grid>
    );
};

const validate = values => {
    const errors:any = {};
    if (!values.firstName) {
        errors.firstName = 'Required';
    }
    return errors;
};
//
// const asyncValidate = (values, dispatch, props, field ) => {
//     return props.checkIfEmailTaken(values["email"]).then(emailTaken => {
//         if(emailTaken) throw { email: 'Email is already taken' }
//     });
// };

export default reduxForm<{}, SetUpAgentProfileFormProps>({
    form: 'userSignUpForm',
    validate
})(SetUpAgentProfileForm);
