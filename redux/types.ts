import { IAttorneyState } from "@views/containers/Attorneys/types";
import { IHomePageState } from "@views/containers/HomePage/types";
import { IReferenceState } from "@views/containers/Reference/types";

export interface IRootState {
    homePage: IHomePageState;
    attorneyPage: IAttorneyState;
    reference: IReferenceState;
}