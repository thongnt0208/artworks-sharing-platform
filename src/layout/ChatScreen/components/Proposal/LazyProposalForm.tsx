import { lazy } from 'react';
import { ProposalFormProps } from '../../ChatRelatedTypes';

const LazyProposalForm = lazy(() => import('./ProposalForm'));



const LazyProposalFormWithProps = (props: ProposalFormProps) => (
    <LazyProposalForm {...props} />
);

export default LazyProposalFormWithProps;