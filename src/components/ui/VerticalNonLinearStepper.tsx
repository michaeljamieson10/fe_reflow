import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import {Grid, StepContent} from "@material-ui/core";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            // width: '50em',
        },
        button: {
            marginRight: theme.spacing(1),
        },
        completed: {
            display: 'inline-block',
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    }),
);

function getSteps() {
    return ['Home Criteria', 'Pre-Approval', 'Accepted Offer', 'Home Inspection', 'Contracts Signed','Appraisal','Loan Commitment','Homeowners Insurance','Clear to Close','Final Walkthrough','Closing'];
}

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return 'Step 1: Select campaign settings...';
        case 1:
            return 'Step 2: What is an ad group anyways?';
        case 2:
            return 'Step 3: This is the bit I really care about!';
        default:
            return 'Unknown step';
    }
}
function getStepsRoutes(step: number,transactionId){
    switch(step){
        case 0:
            return `/home_criteria/transaction/${transactionId}`;
        case 1:
            return `/pre_approval/transaction/${transactionId}`;
        case 2:
            return `/accepted_offer/transaction/${transactionId}`;
        case 3:
            return `/home_inspection/transaction/${transactionId}`;
        case 4:
            return `/contracts_signed/transaction/${transactionId}`;
        case 5:
            return `/appraisal/transaction/${transactionId}`;
        case 6:
            return `/loan_commitment/transaction/${transactionId}`;
        case 7:
            return `/homeowners_insurance/transaction/${transactionId}`;
        case 8:
            return `/clear_to_close/transaction/${transactionId}`;
        case 9:
            return `/final_walkthrough/transaction/${transactionId}`;
        case 10:
            return `/closing/transaction/${transactionId}`;

    }

}

export default function VerticalNonLinearStepper({transactionId}) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>({});
    const steps = getSteps();

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                  // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };
    return (
        <div className={classes.root}>
            <Stepper nonLinear activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepButton onClick={handleStep(index)} completed={completed[index]}>
                                                  {label}
                                                     </StepButton>

                        <StepContent>
                            <Grid container direction={"row"}>
                            <Button component={Link} to={getStepsRoutes(index, transactionId)} color="primary" variant="contained"  >
                                View Details
                            </Button>
                            </Grid>

                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            <div>
                {allStepsCompleted() ? (
                    <div>

                    </div>
                ) : (
                    <div>
                    </div>
                )}
            </div>
        </div>
    );
}
