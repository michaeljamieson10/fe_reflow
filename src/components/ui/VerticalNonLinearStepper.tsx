import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import {Grid, StepContent, StepLabel} from "@material-ui/core";
import {Link} from "react-router-dom";

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         root: {
//             width: '100%',
//             // width: '50em',
//             color: 'pink',
//         },
//         button: {
//             marginRight: theme.spacing(1),
//         },
//         completed: {
//             display: 'inline-block',
//         },
//         instructions: {
//             marginTop: theme.spacing(1),
//             marginBottom: theme.spacing(1),
//         },
//     }),
// );
const useStyles = makeStyles(theme => ({
    // root: {
    //     "& .MuiStepIcon-active": { color: "primary" },
    //     "& .MuiStepIcon-completed": { color: "green" },
    //     "& .Mui-disabled .MuiStepIcon-root": { color: "cyan" }
    // }
    stepIconRoot: {
        color: "grey",
        "&.MuiStepIcon-active": {
            color: "primary"
        },
        "&.MuiStepIcon-completed": {
            color: "green"
        }
    }
}));
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

function getStepsStatus(step: number,transactions){
    switch(step){
        case 0:
            if(typeof transactions[0].homeCriteria === 'undefined')return false;
            if(transactions[0].homeCriteria.transactionStatusType === "completed") return true;
            return false;
        case 1:
            if(typeof transactions[0].preApproval === 'undefined')return false;
            if(transactions[0].preApproval.transactionStatusType === "completed") return true;
            return false;
        case 2:
            if(typeof transactions[0].acceptedOffer === 'undefined')return false;
            if(transactions[0].acceptedOffer.transactionStatusType === "completed") return true;
            return false;
        case 3:
            if(typeof transactions[0].homeInspection === 'undefined')return false;
            if(transactions[0].homeInspection.transactionStatusType === "completed") return true;
            return false;
        case 4:
            if(typeof transactions[0].contractsSigned === 'undefined')return false;
            if(transactions[0].contractsSigned.transactionStatusType === "completed") return true;
            return false;
        case 5:
            if(typeof transactions[0].appraisal === 'undefined')return false;
            if(transactions[0].appraisal.transactionStatusType === "completed") return true;
            return false;
        case 6:
            if(typeof transactions[0].loanCommitment === 'undefined')return false;
            if(transactions[0].loanCommitment.transactionStatusType === "completed") return true;
            return false;
        case 7:
            if(typeof transactions[0].homeownersInsurance === 'undefined')return false;
            if(transactions[0].homeownersInsurance.transactionStatusType === "completed") return true;
            return false;
        case 8:
            if(typeof transactions[0].clearToClose === 'undefined')return false;
            if(transactions[0].clearToClose.transactionStatusType === "completed") return true;
            return false;
        case 9:
            if(typeof transactions[0].finalWalkthrough === 'undefined')return false;
            if(transactions[0].finalWalkthrough.transactionStatusType === "completed") return true;
            return false;
        case 10:
            if(typeof transactions[0].closing === 'undefined')return false;
            if(transactions[0].closing.transactionStatusType === "completed") return true;
            return false;

    }

}


export default function VerticalNonLinearStepper({transactionId,transactions}) {
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
        <div >
            <Stepper nonLinear
                     activeStep={activeStep}
                     // className={classes.stepIconRoot}
                     // style={{color: "green" ? "green" : "green"}}
                     orientation="vertical">
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    // stepProps.completed=false;
                    // console.log(stepProps,index,"stepProps",completed)
                    // if (isStepCompleted(index)) {
                    //     stepProps.completed = true;
                    // }else{
                    //     stepProps.completed = false;
                    // }
                    return(
                        <Step key={label}>

                            {/*we need to base completed on the index that it is completed so lets pass in that completed*/}
                            {/*<StepButton onClick={handleStep(index)} completed={completed[index]}>*/}
                            <StepButton onClick={handleStep(index)} completed={getStepsStatus(index,transactions)}>
                                <StepLabel
                                    StepIconProps={{ classes: {
                                        root: classes.stepIconRoot
                                    } }}
                                >
                                    {label}
                                </StepLabel>
                                                         </StepButton>

                            <StepContent>
                                <Grid container direction={"row"}>
                                <Button component={Link} to={getStepsRoutes(index, transactionId)} color="primary" variant="contained"  >
                                    View Details
                                </Button>
                                </Grid>

                            </StepContent>
                        </Step>
                );
                })}
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
