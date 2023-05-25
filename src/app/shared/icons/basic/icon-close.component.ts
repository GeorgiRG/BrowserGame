import { Component, Input } from '@angular/core';

@Component({
	selector: 'icon-close',
	template: `<div class="icon-container">
								<svg xmlns="http://www.w3.org/2000/svg"
									(click)="close()" 
									width = "100" height = "100" viewBox = "0 0 100 100" class="icon-close">
									<path fill="red" d = "M84.707 68.752L65.951 49.998l18.75-18.752a1.989 1.989 0 0 0 0-2.813L71.566 15.295a1.99 1.99 0 0 0-2.814 0L49.999 34.047l-18.75-18.752c-.746-.747-2.067-.747-2.814 0L15.297 28.431a1.992 1.992 0 0 0 0 2.814L34.05 49.998L15.294 68.753a1.993 1.993 0 0 0 0 2.814L28.43 84.704a1.988 1.988 0 0 0 2.814 0l18.755-18.755l18.756 18.754c.389.388.896.583 1.407.583s1.019-.195 1.408-.583l13.138-13.137a1.99 1.99 0 0 0-.001-2.814z" />
								</svg>
							</div>`,
	styleUrls: ['../icon.styles.scss']
})
export class IconCloseComponent {
	@Input() inputId?: string;

	close() {
		let input = document.getElementById(this.inputId!)
		if (input == null) {
			throw new Error('No password input element provided')
		}
		input.style.display = "none";

	}
}




