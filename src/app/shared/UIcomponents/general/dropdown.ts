import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
	selector: 'dropdown',
	template: `	<div class="dropdown" (click)="showContent()">
								<label style="width:80%;color:white;text-shadow: 0 0 1px white;cursor: pointer;"> {{placeholder}}</label>
								<svg style="display:block;margin:auto"xmlns="http://www.w3.org/2000/svg" 
								width="15" height="15" viewBox="0 0 15 15">
								<path fill="none" stroke="white" stroke-linecap="square" d="m14 5l-6.5 7L1 5"/>
								</svg>
							</div>
															<div [id]="contentId" style="display: none;" class="dropdown-content"></div>

						
							`,
	styleUrls: ['./dropdown.styles.scss']
})
export class DropdownComponent {
	@Input() contentId: string = '';
	@Input() placeholder: string = '';
	@Input() options?: Array<string>;
	@Output() dropdownValue: EventEmitter<any> = new EventEmitter();

	ngAfterViewInit(){
		window.addEventListener('click', () => { this.closeDropdowns() });
		let content = document.getElementById(this.contentId);
		if (content != null && this.options != null) {
			this.options.forEach(option => {
				let optionDiv = document.createElement('div');
				optionDiv.textContent = option;
				optionDiv.className = 'option';
				optionDiv.addEventListener('click', () => {
					this.emitValue(option)
					content!.style.display = "none";
				})
				content!.appendChild(optionDiv);
			})
		}
	}
	emitValue(value: string) {
		this.placeholder = value;
		this.dropdownValue.emit(value);
	}
	showContent() {
		setTimeout(() => {
			let content = document.getElementById(this.contentId);
			if (content!.style.display == "none") {
				content!.style.display = "flex";
			}
			else {
				content!.style.display = "none"
			} 
		//adding short delay otherwise instantly closed by window listener
		}, 30 )
	}
	closeDropdowns(){
		let dropdown = document.getElementById(this.contentId);
		dropdown!.style.display == "flex" ? dropdown!.style.display = "none" : {};
	} 

}
