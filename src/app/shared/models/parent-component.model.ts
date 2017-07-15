//
// ParentComponent tem como objetivo prever algumas features que
// são comuns ao componentes, ie: loading bar status e error message

export class ParentComponent {

	public showLoading: boolean;
	public errorMessage: string;

	constructor() {
		this.showLoading = false;
		this.errorMessage = '';
	}
}
